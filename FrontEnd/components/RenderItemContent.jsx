import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import FAQ from "./FAQ";
import CalendarCustom from "./CalendarCustom";
import useLecture from "../hooks/useLecture";
import Calendar from "./CaroseulCustom";

export default React.memo(function RenderItemContent({ item }) {
  switch (item.type) {
    case "Palestras da Casa":
      return (
        <View>
          <Text style={styles.title}>{item.type}</Text>
          <Calendar content={item.data} pathname={'/home/volunteerWork'} />
        </View>
      )
    case "Trabalho Voluntário":
      return (
        <View>
          <Text style={styles.title}>{item.type}</Text>
          {/* Componente correspondente */}
        </View>
      )
    case "Calendário de Eventos":
      return (
        <View>
          <Text style={styles.title}>{item.type}</Text>
          <CalendarCustom />
        </View>
      )
    case "Esclarecimentos sobre o Centro Espírita":
      return (
        <View>
          <Text style={styles.title}>{item.type}</Text>
          <FAQ />
        </View>
      );
    case "Quem Somos - Sociedade Espírita Gabriel Delanne":
      return (
        <View>
          <Text style={styles.title}>{item.type}</Text>
          {/* Componente correspondente */}
        </View>
      )
    case "Avaliações do Centro Espírita":
      return (
        <View>
          <Text style={styles.title}>{item.type}</Text>
          {/* Componente correspondente */}
        </View>
      )
    default: return null
    
  }
})

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: 'white'
  },
});
