import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  Platform,
} from "react-native";
import React from "react";
import { useLocalSearchParams, router } from "expo-router";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  AwardIcon,
  BookOpenIcon,
  StarIcon,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FacilitadorDetails() {
  const params = useLocalSearchParams();
  const facilitadorData = params.data ? JSON.parse(params.data) : {};

  // Dados fixos para João Santos
  const defaultData = {
    idFacilitadores: "1",
    name: "João Santos",
    role: "Facilitador Sênior",
    experience: "15 anos",
    specialization: "Estudos Doutrinários",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
    nextLecture: "20/05/2023",
    status: "Disponível",
    rating: 4.8,
    lecturesCount: 127,
    location: "São Paulo, SP",
    email: "joao.santos@exemplo.com",
    phone: "(11) 99999-9999",
  };

  // Combinar dados recebidos com dados padrão
  const facilitator = { ...defaultData, ...facilitadorData };

  // Dados de exemplo para palestras
  const lectures = [
    {
      id: "1",
      title: "Mediunidade com Jesus",
      date: "15/05/2023",
      time: "19:30",
      duration: "45 min",
    },
    {
      id: "2",
      title: "O Evangelho no Lar",
      date: "22/05/2023",
      time: "20:00",
      duration: "60 min",
    },
    {
      id: "3",
      title: "Passes e Cura Espiritual",
      date: "29/05/2023",
      time: "19:00",
      duration: "50 min",
    },
  ];

  const handleCall = () => {
    Linking.openURL(`tel:${facilitator.phone}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${facilitator.email}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeftIcon size={28} color={"white"} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes do Facilitador</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Seção de Perfil FIXA */}
      <View style={styles.profileSection}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: facilitator.image }}
            style={styles.profileImage}
          />
        </View>

        <Text style={styles.name}>{facilitator.name}</Text>
        <Text style={styles.role}>{facilitator.role}</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{facilitator.lecturesCount}</Text>
            <Text style={styles.statLabel}>Palestras</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{facilitator.experience}</Text>
            <Text style={styles.statLabel}>Experiência</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <StarIcon size={16} color="#FFD700" />
            <Text style={styles.statNumber}>{facilitator.rating}</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Seção de Contato */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações de Contato</Text>

          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <MailIcon size={20} color="#4ECDC4" />
              <Text style={styles.contactText}>{facilitator.email}</Text>
            </View>

            <View style={styles.contactItem}>
              <PhoneIcon size={20} color="#4ECDC4" />
              <Text style={styles.contactText}>{facilitator.phone}</Text>
            </View>

            <View style={styles.contactItem}>
              <MapPinIcon size={20} color="#4ECDC4" />
              <Text style={styles.contactText}>{facilitator.location}</Text>
            </View>
          </View>

          <View style={styles.contactButtons}>
            <TouchableOpacity
              style={[styles.contactButton, styles.callButton]}
              onPress={handleCall}
            >
              <PhoneIcon size={18} color="white" />
              <Text style={styles.contactButtonText}>Ligar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.contactButton, styles.emailButton]}
              onPress={handleEmail}
            >
              <MailIcon size={18} color="white" />
              <Text style={styles.contactButtonText}>E-mail</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Seção de Especializações */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Especializações</Text>

          <View style={styles.skillsContainer}>
            <View style={styles.skillItem}>
              <AwardIcon size={16} color="#4ECDC4" />
              <Text style={styles.skillText}>{facilitator.specialization}</Text>
            </View>

            <View style={styles.skillItem}>
              <AwardIcon size={16} color="#4ECDC4" />
              <Text style={styles.skillText}>Estudos Doutrinários</Text>
            </View>

            <View style={styles.skillItem}>
              <AwardIcon size={16} color="#4ECDC4" />
              <Text style={styles.skillText}>Atendimento Fraterno</Text>
            </View>
          </View>
        </View>

        {/* Seção de Próximas Palestras */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Próximas Palestras</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver todas</Text>
            </TouchableOpacity>
          </View>

          {lectures.map((lecture) => (
            <View key={lecture.id} style={styles.lectureCard}>
              <View style={styles.lectureIcon}>
                <BookOpenIcon size={24} color="#4ECDC4" />
              </View>

              <View style={styles.lectureInfo}>
                <Text style={styles.lectureTitle}>{lecture.title}</Text>

                <View style={styles.lectureDetails}>
                  <View style={styles.lectureDetail}>
                    <CalendarIcon size={14} color="#6B7280" />
                    <Text style={styles.lectureDetailText}>{lecture.date}</Text>
                  </View>

                  <View style={styles.lectureDetail}>
                    <ClockIcon size={14} color="#6B7280" />
                    <Text style={styles.lectureDetailText}>
                      {lecture.time} • {lecture.duration}
                    </Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.lectureButton}>
                <Text style={styles.lectureButtonText}>Inscrever</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Seção Sobre */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre</Text>
          <Text style={styles.aboutText}>
            {facilitator.name} é {facilitator.role.toLowerCase()} com{" "}
            {facilitator.experience} de experiência na casa espírita. Sua
            dedicação aos estudos doutrinários e ao atendimento fraterno tem
            sido fundamental para o crescimento espiritual de todos os
            frequentadores.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003B73",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#003B73",
    borderBottomWidth: 1,
    borderBottomColor: "#1E4C7A",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  headerSpacer: {
    width: 32,
  },
  // Seção de perfil fixa
  profileSection: {
    alignItems: "center",
    paddingVertical: 24,
    backgroundColor: "#00264D",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
  },
  imageContainer: {
    position: "relative",
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#4ECDC4",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    color: "#4ECDC4",
    marginBottom: 8,
    fontWeight: "500",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    color: "white",
  },
  statItem: {
    alignItems: "center",
    paddingHorizontal: 16,
    flexDirection: "row",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginLeft: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#E5E7EB",
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#1E4C7A",
  },
  scrollView: {
    flex: 1,
    paddingTop: 10,
  },
  section: {
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#00264D",
    borderWidth: 1,
    borderColor: "#1E4C7A",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  seeAllText: {
    color: "#4ECDC4",
    fontWeight: "500",
  },
  contactInfo: {
    gap: 12,
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  contactText: {
    fontSize: 16,
    color: "white",
  },
  contactButtons: {
    flexDirection: "row",
    gap: 12,
  },
  contactButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
  },
  callButton: {
    backgroundColor: "#4ECDC4",
  },
  emailButton: {
    backgroundColor: "#1E4C7A",
  },
  contactButtonText: {
    color: "white",
    fontWeight: "500",
  },
  skillsContainer: {
    gap: 8,
  },
  skillItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#1E4C7A",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  skillText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  lectureCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#1E4C7A",
    borderRadius: 12,
    marginBottom: 12,
  },
  lectureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#003B73",
    marginRight: 12,
  },
  lectureInfo: {
    flex: 1,
  },
  lectureTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "white",
    marginBottom: 8,
  },
  lectureDetails: {
    gap: 8,
  },
  lectureDetail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  lectureDetailText: {
    fontSize: 12,
    color: "#E5E7EB",
  },
  lectureButton: {
    backgroundColor: "#4ECDC4",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  lectureButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 22,
    color: "white",
  },
});