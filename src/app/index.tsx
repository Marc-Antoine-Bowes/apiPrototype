import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import DayCard from "@/components/day";
import { useMeteo } from "@/Hooks/useMeteo";

export default function WeatherScreen() {
  const {days, loading } = useMeteo()
  
  function getCurrentDay() {
    const today = new Date();
    const nameOfTheDay = today
      .toLocaleDateString("fr-FR", { weekday: "long" })
      .toLowerCase();

    const day = days.find(
      (d) => d.name.toLowerCase() === nameOfTheDay
    );

    return day;
  }

  if (loading) return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#3B82F6" />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Prévisions</Text>

      {getCurrentDay() ? (
        <DayCard item={getCurrentDay()!} isCurrent />
      ) : null}

      <FlatList
        data={days}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => <DayCard item={item} />}
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
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
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
    color: "#3B82F6",
  },
  tempMax: {
    fontSize: 22,
    fontWeight: "700",
    color: "#F97316",
  },
  divider: {
    width: 1,
    height: 36,
    backgroundColor: "#E2E8F0",
  },
});