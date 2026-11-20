import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getWeatherIcon } from "@/utils/weatherIcons";

type HourData = {
  label: string;
  meteo_data: {
    humidity: string;
    uvIndex: string;
    aqi: string;
    temp: number | string;
    unit: string;
    weatherCode: number;
  };
};

type HourRowProps = {
  item: HourData;
  isCurrent?: boolean;
};

export default function HourRow({ item, isCurrent = false }: HourRowProps) {
  const { name: iconName, color: iconColor } = getWeatherIcon(
    item.meteo_data.weatherCode
  );

  return (
    <View style={[styles.hourRow, isCurrent && styles.currentHourRow]}>
      <View style={styles.left}>
        <Ionicons name={iconName} size={22} color={iconColor} style={{ marginRight: 12 }} />
        <Text style={[styles.timeLabel, isCurrent && styles.currentText]}>
          {item.label}
        </Text>
      </View>

      <View style={styles.right}>
        <Text style={[styles.tempText, isCurrent && styles.currentTemp]}>
          {item.meteo_data.temp}{item.meteo_data.unit}
        </Text>
        <Text style={styles.meta}>
          💧 {item.meteo_data.humidity ?? "–"}%
          {"  "}
          ☀️ UV {item.meteo_data.uvIndex ?? "–"}
          {"  "}
          AQI {item.meteo_data.aqi ?? "–"}
        </Text>
      </View>
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
  right: { alignItems: "flex-end" },
  meta: { fontSize: 12, color: "#94A3B8", marginTop: 4 },
  currentHourRow: {
    backgroundColor: "#EFF6FF",
    borderColor: "#3B82F6",
    borderWidth: 1.5,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
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