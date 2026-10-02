// components/DayCard.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Day } from "@/types/types";

type DayCardProps = {
  item: Day;
  isCurrent?: boolean; // ← nouveau
};

export default function DayCard({ item, isCurrent = false }: DayCardProps) {
  const handlePress = () => {
    router.push({
      pathname: "/[name]",
      params: { name: item.name, date: item.date },
    });
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
      <View style={[styles.card, isCurrent && styles.currentCard]}>
        {isCurrent && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Aujourd'hui</Text>
          </View>
        )}

        <Text style={[styles.dayName, isCurrent && styles.currentDayName]}>
          {item.name}
        </Text>

        <View style={styles.tempRow}>
          <View style={styles.tempBlock}>
            <Text style={styles.tempLabel}>Min</Text>
            <Text style={[styles.tempMin, isCurrent && styles.currentTemp]}>
              {item.meteo_data.tempMin}
              {item.meteo_data.unit}
            </Text>
          </View>

          <View style={[styles.divider, isCurrent && styles.currentDivider]} />

          <View style={styles.tempBlock}>
            <Text style={styles.tempLabel}>Max</Text>
            <Text style={[styles.tempMax, isCurrent && styles.currentTemp]}>
              {item.meteo_data.tempMax}
              {item.meteo_data.unit}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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

  // Style spécial pour le jour actuel
  currentCard: {
    backgroundColor: "#EFF6FF", // bleu très clair
    borderColor: "#3B82F6",
    borderWidth: 2,
    shadowColor: "#3B82F6",
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#3B82F6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 10,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },

  dayName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 14,
  },
  currentDayName: {
    color: "#1E40AF",
    fontWeight: "700",
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
  currentTemp: {
    fontSize: 24,
  },
  divider: {
    width: 1,
    height: 36,
    backgroundColor: "#E2E8F0",
  },
  currentDivider: {
    backgroundColor: "#93C5FD",
  },
});