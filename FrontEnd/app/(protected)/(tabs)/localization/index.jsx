import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Dimensions,
  Linking,
  Image,
  TextInput,
  StatusBar,
} from "react-native";
import {
  MapPin,
  Navigation,
  Phone,
  Globe,
  Clock,
  Filter,
  ChevronDown,
  Crosshair,
  Search,
  Star,
  ArrowRight,
  Bell,
  MenuIcon,
  CrosshairIcon,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import ButtonIcons from "../../../../components/ButtonIcons";
import Sidebar from "../../../../components/Sidebar";
import { AuthContext } from "../../../../context/auth";
import Header from "../../../../components/Header";
import Trending from "../../../../components/Navagation";

const HomeLocalization = () => {
  const { user } = useContext(AuthContext);
  const [userLocation, setUserLocation] = useState(null);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [centros, setCentros] = useState([]);
  const [filteredCentros, setFilteredCentros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Dados de exemplo incluindo o centro real
  const centrosExemplo = [
    {
      id: 1,
      name: "Sociedade Espírita Gabriel Dellane",
      address: "R. Coração de Maria, 341 - Centro, Esteio - RS, 93280-030",
      distance: 0.8,
      phone: "(51) 3473-1301",
      website: "https://www.gabrieldellane.org.br",
      schedule: "Segunda a sexta: 19h-21h | Sábado: 15h-17h",
      coordinates: {
        latitude: -29.86,
        longitude: -51.1784,
      },
      activities: ["Estudo", "Passes", "Atendimento Fraterno", "Evangelização"],
      description:
        "Sociedade Espírita Gabriel Dellane, localizada em Esteio-RS, dedicada ao estudo e prática da doutrina espírita com trabalhos de passes, atendimento fraterno e evangelização. Fundada em 1985, nossa casa tem como missão divulgar o espiritismo e oferecer apoio espiritual à comunidade.",
      rating: 4.7,
      totalRatings: 156,
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
      reviews: [
        {
          author: "Maria Silva",
          rating: 5,
          comment:
            "Ambiente acolhedor e estudos muito enriquecedores. Os voluntários são muito atenciosos.",
        },
        {
          author: "João Santos",
          rating: 4,
          comment:
            "Ótimo atendimento, voltarei mais vezes. Só achei o estacionamento um pouco complicado.",
        },
        {
          author: "Ana Pereira",
          rating: 5,
          comment:
            "Local de muita paz e aprendizado. As palestras são transformadoras.",
        },
      ],
      photos: [
        "https://images.unsplash.com/photo-1581351721010-4d0b56c0e0de?w=400",
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400",
        "https://images.unsplash.com/photo-1516527653392-602455dd9cf3?w=400",
      ],
    },
    {
      id: 2,
      name: "Centro Espírita Luz e Caridade",
      address: "Rua das Flores, 123 - Centro, São Paulo - SP",
      distance: 1.2,
      phone: "(11) 9999-8888",
      website: "https://www.luzecaridade.org.br",
      schedule: "Terça e quinta: 20h-22h | Domingo: 9h-11h",
      coordinates: {
        latitude: -23.5505,
        longitude: -46.6333,
      },
      activities: ["Estudo", "Evangelização", "Tratamento Espiritual"],
      description:
        "Centro espírita nomeado em homenagem a Gabriel Delanne, dedicado ao estudo e divulgação da doutrina espírita.",
      rating: 4.8,
      totalRatings: 89,
      image:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400",
      reviews: [
        {
          author: "Ana Costa",
          rating: 5,
          comment: "Palestras excelentes e equipe muito prestativa.",
        },
        {
          author: "Carlos Oliveira",
          rating: 5,
          comment: "Local perfeito para estudo e reflexão.",
        },
      ],
      photos: [
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400",
        "https://images.unsplash.com-1581351721010-4d0b56c0e0de?w=400",
      ],
    },
  ];

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = centros.filter(
        (centro) =>
          centro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          centro.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          centro.activities.some((activity) =>
            activity.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
      setFilteredCentros(filtered);
    } else {
      setFilteredCentros(centros);
    }
  }, [searchQuery, centros]);

  const getLocation = async () => {
    try {
      setLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permissão negada",
          "Permita o acesso à localização para encontrar centros próximos"
        );
        setCentros(centrosExemplo);
        setFilteredCentros(centrosExemplo);
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);

      setTimeout(() => {
        const centrosOrdenados = [...centrosExemplo].sort(
          (a, b) => a.distance - b.distance
        );
        setCentros(centrosOrdenados);
        setFilteredCentros(centrosOrdenados);
        setLoading(false);
      }, 1500);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível obter a localização");
      setCentros(centrosExemplo);
      setFilteredCentros(centrosExemplo);
      setLoading(false);
    }
  };

  const filterCentros = (filter) => {
    setSelectedFilter(filter);
    let filtered = [...centros];

    if (filter === "near") {
      filtered = filtered.filter((centro) => centro.distance <= 2);
    } else if (filter === "rating") {
      filtered = filtered
        .filter((centro) => centro.rating >= 4)
        .sort((a, b) => b.rating - a.rating);
    } else if (filter !== "all") {
      filtered = filtered.filter((centro) =>
        centro.activities.includes(filter)
      );
    }

    setFilteredCentros(filtered);
    setShowFilters(false);
  };

  const openGoogleMaps = (centro) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      centro.address
    )}`;
    Linking.openURL(url).catch(() => {
      Alert.alert("Erro", "Não foi possível abrir o Google Maps");
    });
  };

  const callNumber = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  const openWebsite = (website) => {
    Linking.openURL(website);
  };

  const formatTime = () => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`;
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={16} color="#FFD700" fill="#FFD700" />);
    }

    const emptyStars = 5 - fullStars;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={fullStars + i} size={16} color="#CCC" />);
    }

    return stars;
  };

  const navigateToDetails = (centro) => {
    router.push({
      pathname: "/localization/centroDetails",
      params: { centro: JSON.stringify(centro) },
    });
  };

  

  return (
    <View style={styles.container}>
      <Sidebar isOpen={isSideBarOpen} setIsOpen={setIsSideBarOpen} />

      {/* Header */}
      <View style={styles.Container}>
  <Header title="Home" onMenuPress={() => setIsSideBarOpen(!isSideBarOpen)} />
  <Trending
    navagations={[
      {
        name: "Palestras da Casa",
        path: "/home/lectures",
        data: [],
      },
      { name: "FAQ", path: "/home/faq" },
    ]}
  />
</View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar centro, localização..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Filter size={20} color="#4A90E2" />
        </TouchableOpacity>
      </View>

      {showFilters && (
        <View style={styles.filterOptions}>
          <Text style={styles.filterTitle}>Filtrar por:</Text>
          <View style={styles.filterRow}>
            <TouchableOpacity
              style={[
                styles.filterChip,
                selectedFilter === "all" && styles.selectedChip,
              ]}
              onPress={() => filterCentros("all")}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedFilter === "all" && styles.selectedChipText,
                ]}
              >
                Todos
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterChip,
                selectedFilter === "near" && styles.selectedChip,
              ]}
              onPress={() => filterCentros("near")}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedFilter === "near" && styles.selectedChipText,
                ]}
              >
                Próximos
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterChip,
                selectedFilter === "rating" && styles.selectedChip,
              ]}
              onPress={() => filterCentros("rating")}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedFilter === "rating" && styles.selectedChipText,
                ]}
              >
                Melhores avaliações
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <ScrollView
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Centros Espíritas Próximos</Text>

        {filteredCentros.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MapPin size={48} color="#CCC" />
            <Text style={styles.emptyText}>Nenhum centro encontrado</Text>
            <Text style={styles.emptySubtext}>
              Tente ajustar os filtros ou busca
            </Text>
          </View>
        ) : (
          filteredCentros.map((centro) => (
            <View key={centro.id} style={styles.centroCard}>
              <Image
                source={{ uri: centro.image }}
                style={styles.centroImage}
              />
              <View style={styles.centroContent}>
                <View style={styles.centroHeader}>
                  <Text style={styles.centroName} numberOfLines={1}>
                    {centro.name}
                  </Text>
                  <View style={styles.distanceBadge}>
                    <Text style={styles.distanceText}>
                      {centro.distance} km
                    </Text>
                  </View>
                </View>

                {centro.rating && (
                  <View style={styles.ratingContainer}>
                    {renderStars(centro.rating)}
                    <Text style={styles.ratingText}>
                      ({centro.totalRatings})
                    </Text>
                  </View>
                )}

                <View style={styles.addressContainer}>
                  <MapPin size={14} color="#666" />
                  <Text style={styles.address} numberOfLines={2}>
                    {centro.address}
                  </Text>
                </View>

                <View style={styles.scheduleContainer}>
                  <Clock size={14} color="#666" />
                  <Text style={styles.schedule} numberOfLines={1}>
                    {centro.schedule}
                  </Text>
                </View>

                <View style={styles.activities}>
                  {centro.activities.slice(0, 3).map((activity, index) => (
                    <View key={index} style={styles.activityTag}>
                      <Text style={styles.activityText}>{activity}</Text>
                    </View>
                  ))}
                  {centro.activities.length > 3 && (
                    <View style={styles.moreActivities}>
                      <Text style={styles.moreActivitiesText}>
                        +{centro.activities.length - 3}
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.smallActionButton}
                    onPress={() => openGoogleMaps(centro)}
                  >
                    <Navigation size={14} color="#4A90E2" />
                    <Text style={styles.smallActionText}>Abrir no Maps</Text>
                  </TouchableOpacity>

                  {centro.website && (
                    <TouchableOpacity
                      style={styles.smallActionButton}
                      onPress={() => openWebsite(centro.website)}
                    >
                      <Globe size={14} color="#4A90E2" />
                      <Text style={styles.smallActionText}>Site</Text>
                    </TouchableOpacity>
                  )}

                  {centro.phone && (
                    <TouchableOpacity
                      style={styles.smallActionButton}
                      onPress={() => callNumber(centro.phone)}
                    >
                      <Phone size={14} color="#4A90E2" />
                      <Text style={styles.smallActionText}>Ligar</Text>
                    </TouchableOpacity>
                  )}
                </View>

                <TouchableOpacity
                  style={styles.seeMoreButton}
                  onPress={() => navigateToDetails(centro)}
                >
                  <Text style={styles.seeMoreText}>Ver mais informações</Text>
                  <ArrowRight size={16} color="#4A90E2" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
      <View style={{ height: 115 }} />
    </View>
  );
};

export default React.memo(HomeLocalization);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003B73",
    padding: 16,
    paddingTop: 48,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#003B73",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "white",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  avatarImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  header: {
    marginBottom: 20,
    paddingTop: 11,
  },
  timeText: {
    fontSize: 15,
    color: "#666",
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  IconsContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  locationButton: {
    padding: 10,
    backgroundColor: "#f0f6ff",
    borderRadius: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    height: 50,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  filterButton: {
    padding: 8,
  },
  filterOptions: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 16,
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "white",
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f0f6ff",
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedChip: {
    backgroundColor: "#4A90E2",
  },
  filterChipText: {
    color: "#4A90E2",
    fontSize: 14,
    fontWeight: "500",
  },
  selectedChipText: {
    color: "#fff",
  },
  listContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
  },
  centroCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  centroImage: {
    width: "100%",
    height: 160,
  },
  centroContent: {
    padding: 16,
  },
  centroHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  centroName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    marginRight: 8,
  },
  distanceBadge: {
    backgroundColor: "#4A90E2",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  distanceText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#666",
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  address: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  scheduleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  schedule: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  activities: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  activityTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#e6f2ff",
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  activityText: {
    fontSize: 12,
    color: "#4A90E2",
    fontWeight: "500",
  },
  moreActivities: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#f0f0f0",
    borderRadius: 16,
  },
  moreActivitiesText: {
    fontSize: 12,
    color: "#666",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 12,
  },
  smallActionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#f0f6ff",
    borderRadius: 16,
    marginRight: 8,
  },
  smallActionText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#4A90E2",
    fontWeight: "500",
  },
  seeMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    backgroundColor: "#f0f6ff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4A90E2",
  },
  seeMoreText: {
    color: "#4A90E2",
    fontWeight: "600",
    marginRight: 8,
  },
});
