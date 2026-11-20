import { createContext, useState, useEffect } from "react";
import * as Location from "expo-location";
import { getMeteo, getMeteoHours, getAirQuality } from "@/api/meteo/meteoApi";
import { mapMeteoListResponseToDays, mapMeteoListResponseToHours } from "@/mappers/meteoMapper";
import { Day, Hour, HoursByDate, MeteoContextType, CachedMeteo } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const MeteoContext = createContext<MeteoContextType | null>(null);

const METEO_DATA = "meteoData";
const TIME_BEFORE_ERASE_MS = 1440 * 60 * 1000; // 24 h
const FALLBACK_COORDS = { latitude: 46.8139, longitude: -71.2080 };

type Coords = { latitude: number; longitude: number };

// ~1 km de précision : évite d'invalider le cache pour des variations GPS minuscules
const makeCoordsKey = (c: Coords) => `${c.latitude.toFixed(2)},${c.longitude.toFixed(2)}`;

export const MeteoContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [days, setDays] = useState<Day[]>([]);
  const [hours, setHours] = useState<Hour[]>([]);
  const [hoursByDate, setHoursByDate] = useState<HoursByDate>({});
  const [loading, setLoading] = useState(true);
  const [hoursloading, setHoursLoading] = useState(false);
  const [coords, setCoords] = useState<Coords | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  // 1. Position (inchangé)
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setLocationError("Permission localisation refusée");
          setCoords(FALLBACK_COORDS);
          return;
        }
        const loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        setCoords({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
      } catch (e) {
        console.error(e);
        setLocationError("Impossible d'obtenir la position");
        setCoords(FALLBACK_COORDS);
      }
    })();
  }, []);

  // 2. Cache ou API, dès que les coords sont connues
  useEffect(() => {
    if (!coords) return;
    loadMeteoData(coords);
  }, [coords]);

  async function fetchHours(c: Coords, date: string): Promise<Hour[]> {
    const [meteoData, airData] = await Promise.all([
      getMeteoHours(c.latitude, c.longitude, date),
      getAirQuality(c.latitude, c.longitude, date).catch(() => undefined),
    ]);
    return mapMeteoListResponseToHours(meteoData, airData);
  }

  async function saveCache(c: Coords, d: Day[], h: HoursByDate) {
    const toSave: CachedMeteo = {
      expiryTime: Date.now() + TIME_BEFORE_ERASE_MS,
      coordsKey: makeCoordsKey(c),
      days: d,
      hoursByDate: h,
    };
    await AsyncStorage.setItem(METEO_DATA, JSON.stringify(toSave));
  }

  async function loadMeteoData(c: Coords) {
    setLoading(true);
    try {
      // a) Cache valide pour cette position ?
      const saved = await AsyncStorage.getItem(METEO_DATA);
      if (saved) {
        const cached = JSON.parse(saved) as CachedMeteo;
        if (Date.now() < cached.expiryTime && cached.coordsKey === makeCoordsKey(c)) {
          setDays(cached.days);
          setHoursByDate(cached.hoursByDate);
          return;
        }
        await AsyncStorage.removeItem(METEO_DATA);
      }

      // b) Sinon : appel API pour les jours, puis sauvegarde
      const freshDays = mapMeteoListResponseToDays(await getMeteo(c.latitude, c.longitude));
      setDays(freshDays);
      setHoursByDate({});
      await saveCache(c, freshDays, {});
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // 3. Heures + qualité de l'air : cache mémoire/disque d'abord, API sinon
  async function loadHours(date: string) {
    if (!date || !coords) return;

    if (hoursByDate[date]) {
      setHours(hoursByDate[date]);
      return;
    }

    setHoursLoading(true);
    try {
      const formatted = await fetchHours(coords, date);
      setHours(formatted);

      const updated = { ...hoursByDate, [date]: formatted };
      setHoursByDate(updated);
      await saveCache(coords, days, updated); // met à jour le cache disque
    } catch (err) {
      console.error(err);
    } finally {
      setHoursLoading(false);
    }
  }

  return (
    <MeteoContext.Provider
      value={{ days, hours, hoursByDate, loading, hoursloading, loadHours, locationError }}
    >
      {children}
    </MeteoContext.Provider>
  );
}