import { getMeteoHours } from "@/api/meteo/meteoApi";
import { mapMeteoListResponseToHours } from "@/mappers/meteoMapper";
import { Hour } from "@/types/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HourRow from "@/components/hour";

export default function HourlyWeatherScreen() {
  const { name, date } = useLocalSearchParams<{ name: string; date: string }>();
  const [hours, setHours] = useState<Hour[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (date) {
      // Coordonnées de Québec
      getMeteoHours(46.8139, -71.2080, date)
        .then((data) => {
          const formattedHours = mapMeteoListResponseToHours(data);
          setHours(formattedHours);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [date]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Retour</Text>
      </TouchableOpacity>

      <Text style={styles.header}>{name ?? "Détail de la journée"}</Text>
      <Text style={styles.subHeader}>{date}</Text>
      
      <FlatList
        data={hours}
        keyExtractor={(item) => item.time}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <HourRow key={item.label} item={item} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  backButton: {
    marginBottom: 12,
  },
  backText: {
    fontSize: 16,
    color: "#3B82F6",
    fontWeight: "600",
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1E293B",
    letterSpacing: -0.5,
  },
  subHeader: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 30,
  },
  hourRow: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  timeLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#334155",
  },
  tempText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#3B82F6",
  },
});