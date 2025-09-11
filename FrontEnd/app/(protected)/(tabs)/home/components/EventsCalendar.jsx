import React, { useState } from "react";
import { View, Text, Modal, ScrollView, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { PencilIcon } from "lucide-react-native";
import styles from "../styles/homeStyles";

const EventCalendar = ({ calendar }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
    const eventsForDate = calendar.filter((event) => event.date === day.dateString);
    setSelectedDateEvents(eventsForDate);
    setModalVisible(true);
  };

  return (
    <View style={styles.calendarSection}>
      <Calendar
        accessibilityLanguage="PT-BR"
        style={styles.calendar}
        theme={{
          backgroundColor: "#ffffff",
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#003B73",
          selectedDayBackgroundColor: "#0A73D9",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#0A73D9",
          dayTextColor: "#2d4150",
          textDisabledColor: "#A0C1E8",
          arrowColor: "#0A73D9",
          monthTextColor: "#003B73",
          textDayFontWeight: "300",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "500",
          textDayFontSize: 14,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 14,
        }}
        onDayPress={handleDateSelect}
        markedDates={{
          ...calendar.reduce((acc, event) => {
            acc[event.date] = { marked: true, dotColor: "#FF6B6B", activeOpacity: 0.7 };
            return acc;
          }, {}),
          [selectedDate]: { selected: true, selectedColor: "#0A73D9", selectedTextColor: "#ffffff" },
        }}
      />
      <Text style={styles.selectDateHint}>Toque em uma data para ver os eventos</Text>

      <Modal animationType="slide" transparent visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Eventos do dia {selectedDate}</Text>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalScrollView}>
              {selectedDateEvents.length > 0 ? (
                selectedDateEvents.map((event, index) => (
                  <View key={index} style={styles.eventItem}>
                    <View style={styles.eventTimeContainer}>
                      <Text style={styles.eventTime}>{event.time || "Horário não especificado"}</Text>
                    </View>
                    <View style={styles.eventDetails}>
                      <Text style={styles.eventName}>{event.name}</Text>
                      <Text style={styles.eventDescription}>{event.description || "Sem descrição"}</Text>
                    </View>
                  </View>
                ))
              ) : (
                <View style={styles.noEventsContainer}>
                  <Text style={styles.noEventsText}>Nenhum evento para esta data</Text>
                </View>
              )}
            </ScrollView>

            {(calendar[0]?.status_permission === "admin" ||
              calendar[0]?.status_permission === "SuperAdmin") && (
              <TouchableOpacity style={styles.addEventButton}>
                <PencilIcon color="white" size={20} />
                <Text style={styles.addEventText}>Adicionar Evento</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EventCalendar;