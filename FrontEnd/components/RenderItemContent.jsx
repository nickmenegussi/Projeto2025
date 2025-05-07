import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import FAQ from "./FAQ";
import CalendarCustom from "./CalendarCustom";
import useReview from "../hooks/useReview";
import Calendar from "./CaroseulCustom";

export default React.memo(function RenderItemContent({ item }) {
  const [data, setData] = useState([{
    lectures: [],
    trabalhos: [],
    eventos: [],
    reviews: [],
  }])

  const fetchData = async () => {
    if(item.type === "Palestras da Casa"){
      const response = await getLecture
    }
  }


  switch (item.type) {
    case "Palestras da Casa":
      return (
        <View>
          <Text style={styles.title}>{item.type}</Text>
          <Calendar content={console.log(item)} pathname={'/home/volunteerWork'} />
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
    default: null
    
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
