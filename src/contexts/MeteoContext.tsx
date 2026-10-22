import { DayWithHours, MeteoContextType } from "@/types/types";
import { createContext, useState } from "react";
import { getMeteo } from "@/api/meteo/meteoApi";
import { mapMeteoListResponseToDays } from "@/mappers/meteoMapper";
import { useEffect } from "react";
import { Day } from "@/types/types";
import { getMeteoHours } from "@/api/meteo/meteoApi";
import { mapMeteoListResponseToHours } from "@/mappers/meteoMapper";
import { Hour } from "@/types/types";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const MeteoContext = createContext<MeteoContextType | null>(null);

const METEO_DATA = "meteoData";
const TIME_BEFORE_ERASE = 1440;

export const MeteoContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [localMeteoData, setLocalMeteoData] = useState<DayWithHours[]>([]);
    const [days, setDays] = useState<Day[]>([]);
    const [hours, setHours] = useState<Hour[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [hoursloading, setHoursLoading] = useState<boolean>(true);

    useEffect(() => {
        getMeteo(46.8139, -71.2080)
        .then((data) => {
        const formattedDays = mapMeteoListResponseToDays(data);
        setDays(formattedDays);
    }).catch((err) => console.error(err))
      .finally(() => setLoading(false))
    }, []);

    async function loadDays() {
        useEffect(() => {
            getMeteo(46.8139, -71.2080)
            .then((data) => {
            const formattedDays = mapMeteoListResponseToDays(data);
            setDays(formattedDays);
        }).catch((err) => console.error(err))
            .finally(() => setLoading(false))
        }, []);
    }

    async function loadHours(date : string) {
        if (date) {
          // Coordonnées de Québec
          getMeteoHours(46.8139, -71.2080, date)
            .then((data) => {
              const formattedHours = mapMeteoListResponseToHours(data);
              setHours(formattedHours);
            })
            .catch((err) => console.error(err))
            .finally(() => setHoursLoading(false));
        }
    }
    
    async function saveInAsyncStorage() {
        const now = new Date();
        now.setMinutes(now.getMinutes() + TIME_BEFORE_ERASE); // add the expiration time to the current Date time
        const expiryTimeInTimestamp = Math.floor(now.getTime() / 1000); // convert the expiry time in UNIX timestamp
        setMeteoData(expiryTimeInTimestamp);
        const data = {
            data: localMeteoData
        };

        await AsyncStorage.setItem(
            METEO_DATA,
            JSON.stringify(data)
        );
    }
    
    function setMeteoData (expiryTime : number) {
        loadDays()

        days.forEach ((day) => {
            loadHours(day.name)
            let dayAndHour : DayWithHours = {
                day, hours
            }

            setLocalMeteoData([...localMeteoData, dayAndHour])
        })
    }

    async function loadMeteoData() {
        const savedDataString = await AsyncStorage.getItem(METEO_DATA);

        if (savedDataString === null) {
            await saveInAsyncStorage();
            return;
        }

        const savedData = JSON.parse(savedDataString) as {
            data: DayWithHours[];
            expiryTime: number;
        };

        const currentTimestamp = Math.floor(Date.now() / 1000);

        if (currentTimestamp >= savedData.expiryTime) {
            await AsyncStorage.removeItem(METEO_DATA);
            await saveInAsyncStorage();
        } else {

        }
    }

  return (
    <MeteoContext.Provider value={{ days, hours, loading, hoursloading, loadHours}}>
      {children}
    </MeteoContext.Provider>
  );
};