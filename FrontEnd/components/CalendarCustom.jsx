import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";

export default React.memo(function CalendarCustom() {
  const [selectedDate, setSelectedDate] = useState(null)
  return (
    <View>
      <Calendar
        style={styles.calendar}
        theme={{
          backgroundColor: "#60A3D9",
          calendarBackground: "#60A3D9",
          textSectionTitleColor: "#fff",
          selectedDayBackgroundColor: "#0A73D9",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#0A73D9",
          dayTextColor: "#ffffff",
          textDisabledColor: "#A0C1E8",
          arrowColor: "#ffffff",
          monthTextColor: "#ffffff",
        }}
        onDayPress={(day) => setSelectedDate(day.dateString)}
      />
    </View>
  );
})
const styles = StyleSheet.create({
  calendar: {
    height: 550,
    borderRadius: 10,
    marginBottom: 40,
  },
});
