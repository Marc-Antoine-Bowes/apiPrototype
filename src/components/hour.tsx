// components/HourRow.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

type HourData = {
  label: string;
  meteo_data: {
    temp: number | string;
    unit: string;
  };
};

type HourRowProps = {
  item: HourData;
  isCurrent?: boolean; // optionnel si tu veux highlighter l'heure actuelle
};

export default function HourRow({ item, isCurrent = false }: HourRowProps) {
  return (
    <View style={[styles.hourRow, isCurrent && styles.currentHourRow]}>
      <Text style={[styles.timeLabel, isCurrent && styles.currentText]}>
        {item.label}
      </Text>
      <Text style={[styles.tempText, isCurrent && styles.currentTemp]}>
        {item.meteo_data.temp}
        {item.meteo_data.unit}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hourRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  currentHourRow: {
    backgroundColor: "#EFF6FF",
    borderColor: "#3B82F6",
    borderWidth: 1.5,
  },
  timeLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#64748B",
  },
  tempText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1E293B",
  },
  currentText: {
    color: "#1E40AF",
    fontWeight: "600",
  },
  currentTemp: {
    color: "#3B82F6",
  },
});