import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View, StyleSheet} from "react-native";
import { getMeteo } from "@/app/api/meteo/meteoApi"
import { mapMeteoListResponseToDays } from "@/app/mappers/meteoMapper";
import { Day } from "@/app/types/types";

export default function WeatherScreen() {
  const [days, setDays] = useState<Day[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Exemple pour Québec
    getMeteo(46.8139, -71.2080)
      .then((data) => {
        const formattedDays = mapMeteoListResponseToDays(data);
        setDays(formattedDays);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
    </View>
  )

return (
    <View style={styles.container}>
      <Text style={styles.header}>Prévisions</Text>

      <FlatList
        data={days}
        keyExtractor={(item) => item.date}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.dayName}>{item.name}</Text>

            <View style={styles.tempRow}>
              <View style={styles.tempBlock}>
                <Text style={styles.tempLabel}>Min</Text>
                <Text style={styles.tempMin}>
                  {item.meteo_data.tempMin}
                  {item.meteo_data.unit}
                </Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.tempBlock}>
                <Text style={styles.tempLabel}>Max</Text>
                <Text style={styles.tempMax}>
                  {item.meteo_data.tempMax}
                  {item.meteo_data.unit}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  )
}

//Css 100% par IA 
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },

  container: {
    flex: 1,
    backgroundColor: "#F8FAFC", // fond très clair et doux
    paddingHorizontal: 20,
    paddingTop: 16,
  },

  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 20,
    letterSpacing: -0.5,
  },

  listContent: {
    paddingBottom: 30,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 14,
    
    // Ombre douce et moderne
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,

    // Petite bordure très légère
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },

  dayName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 14,
  },

  tempRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  tempBlock: {
    alignItems: "center",
    flex: 1,
  },

  tempLabel: {
    fontSize: 13,
    color: "#94A3B8",
    marginBottom: 4,
    fontWeight: "500",
  },

  tempMin: {
    fontSize: 22,
    fontWeight: "700",
    color: "#3B82F6", // bleu frais pour le min
  },

  tempMax: {
    fontSize: 22,
    fontWeight: "700",
    color: "#F97316", // orange pour le max
  },

  divider: {
    width: 1,
    height: 36,
    backgroundColor: "#E2E8F0",
  },
});