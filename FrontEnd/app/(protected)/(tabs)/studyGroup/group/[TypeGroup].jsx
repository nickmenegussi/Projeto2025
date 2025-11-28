import {
  View,
  Text,
  Alert,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import api from "../../../../../services/api";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowLeft,
  BookOpen,
} from "lucide-react-native";

export default function GroupOfStudy() {
  const { TypeGroup } = useLocalSearchParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (TypeGroup) {
      fetchGroupByType(TypeGroup);
    }
  }, [TypeGroup]);

  const formateTimeForDatTime = (datetimeString) => {
    if (!datetimeString) return "Horário a combinar";

    try {
      // Cria um objeto Date a partir da string
      const date = new Date(datetimeString);

      // Extrai apenas as horas e minutos
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");

      return `${hours}:${minutes}`;
    } catch (error) {
      console.error("Erro ao extrair horário:", error);
      return "Horário inválido";
    }
  };

  const fetchGroupByType = async (type) => {
    try {
      setLoading(true);
      const response = await api.get(`/groupOfStudy/groupOfStudy/${type}`);
      setGroup(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar grupo por tipo:", error);
      Alert.alert("Erro", "Não foi possível buscar o grupo.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={{ marginTop: 8, color: "white" }}>
          Carregando {TypeGroup}…
        </Text>
      </View>
    );
  }

  if (!group || !group.length) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <ArrowLeft color="white" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Grupos de {TypeGroup}</Text>
          <View style={{ width: 24 }} /> 
        </View>

        <View style={styles.center}>
          <BookOpen size={48} color="#A0A0A0" />
          <Text style={styles.emptyText}>
            Sem grupos para  no momento.
          </Text>
          <Text style={styles.emptySubtext}>
            Volte em breve para novas turmas.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft color="white" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Grupos de {TypeGroup}</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <ScrollView style={styles.scrollView}>
        {group.map((item) => (
          <View key={item.IdGroupOfStudy} style={styles.groupCard}>
            <ImageBackground
              source={
                item.ImageUrl
                  ? { uri: item.ImageUrl }
                  : require("../../../../../assets/images/Jesus-Cristo.png")
              }
              style={styles.cardImage}
              imageStyle={styles.cardImageStyle}
            >
              <View style={styles.imageOverlay}>
                <Text style={styles.groupName}>{item.NameStudy || "Nome do Grupo"}</Text>
                <Text style={styles.groupType}>{item.TypeGroup || "Tipo do Grupo"}</Text>
              </View>
            </ImageBackground>

            <View style={styles.cardContent}>
              {/* Informações do grupo */}
              <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                  <Calendar size={18} color="#4A90E2" />
                  <Text style={styles.infoText}>
                    {item.DayOfWeek || "A definir"}
                  </Text>
                </View>

                <View style={styles.infoItem}>
                  <Clock size={18} color="#4A90E2" />
                  <Text style={styles.infoText}>
                    {formateTimeForDatTime(item.StartTime) ||
                      "Horário a combinar"}
                  </Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                  <MapPin size={18} color="#4A90E2" />
                  <Text style={styles.infoText}>
                    {item.Location || "Local a definir"}
                  </Text>
                </View>

                {/* <View style={styles.infoItem}>
                  <Users size={18} color="#4A90E2" />
                 <Text style={styles.infoText}>{"Novo grupo"}</Text> 
                </View> */}
              </View>

              {/* Descrição */}
              {item.Description && (
                <View style={styles.descriptionContainer}>
                  <Text style={styles.descriptionTitle}>Sobre o grupo</Text>
                  <Text style={styles.descriptionText}>{item.Description || "Descrição do Grupo" }</Text>
                </View>
              )}

              {/* Requisitos */}
              {item.Requirements && (
                <View style={styles.requirementsContainer}>
                  <Text style={styles.requirementsTitle}>Pré-requisitos</Text>
                  <Text style={styles.requirementsText}>
                    {item.Requirements || "Pré-requisitos"}
                  </Text>
                </View>
              )}

              {/* Botões de ação */}
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.infoButton}>
                  <Text style={styles.infoButtonText}>Mais Informações</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.joinButton}>
                  <Text style={styles.joinButtonText}>Participar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={{ height: 90 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003B73",
    paddingVertical: 34,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#4A90E2",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollView: {
    flexGrow: 1,
    padding: 16,
  },
  groupCard: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    height: 160,
    width: "100%",
  },
  cardImageStyle: {
    resizeMode: "cover",
  },
  imageOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
    padding: 16,
  },
  groupName: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  groupType: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
  },
  cardContent: {
    padding: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  infoText: {
    marginLeft: 8,
    color: "#333",
    fontSize: 14,
  },
  descriptionContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#003B73",
    marginBottom: 8,
  },
  descriptionText: {
    color: "#555",
    lineHeight: 20,
  },
  requirementsContainer: {
    marginBottom: 16,
  },
  requirementsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#003B73",
    marginBottom: 8,
  },
  requirementsText: {
    color: "#555",
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  infoButton: {
    borderWidth: 1,
    borderColor: "#003B73",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
  },
  infoButtonText: {
    color: "#003B73",
    fontWeight: "500",
  },
  joinButton: {
    backgroundColor: "#003B73",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
  },
  joinButtonText: {
    color: "white",
    fontWeight: "500",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#003B73",
    padding: 20,
  },
  emptyText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
    marginTop: 16,
    textAlign: "center",
  },
  emptySubtext: {
    color: "#A0A0A0",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
});
