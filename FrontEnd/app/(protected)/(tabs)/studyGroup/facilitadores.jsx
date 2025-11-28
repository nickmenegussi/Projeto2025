import { View, Text, FlatList, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Dimensions } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { ArrowLeftIcon, CalendarIcon, ClockIcon, UserIcon, MapPinIcon, UsersIcon } from "lucide-react-native";

// Dados hipotéticos para facilitadores
const facilitatorsData = [
  {
    id: '1',
    name: 'Maria Silva',
    category: 'ESDE',
    experience: '5 anos',
    specialization: 'Estudos Espíritas',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
    nextLecture: '15/05/2023',
    status: 'Disponível'
  },
  {
    id: '2',
    name: 'João Santos',
    category: 'CIEDE',
    experience: '8 anos',
    specialization: 'Mediunidade',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    nextLecture: '20/05/2023',
    status: 'Disponível'
  },
  {
    id: '3',
    name: 'Ana Costa',
    category: 'MEDIUNIDADE',
    experience: '3 anos',
    specialization: 'Evangelho no Lar',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    nextLecture: '18/05/2023',
    status: 'Em férias'
  },
  {
    id: '4',
    name: 'Carlos Oliveira',
    category: 'ESDE',
    experience: '10 anos',
    specialization: 'Atendimento Fraterno',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    nextLecture: '22/05/2023',
    status: 'Disponível'
  },
  {
    id: '5',
    name: 'Fernanda Lima',
    category: 'CIEDE',
    experience: '7 anos',
    specialization: 'Passes Magnéticos',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80',
    nextLecture: '25/05/2023',
    status: 'Disponível'
  },
  {
    id: '6',
    name: 'Roberto Alves',
    category: 'MEDIUNIDADE',
    experience: '4 anos',
    specialization: 'Trabalho com Jovens',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    nextLecture: '19/05/2023',
    status: 'Disponível'
  }
];

const Facilitadores = () => {
  const [selectedFilter, setSelectedFilter] = useState('TODOS')
  const filters = ['TODOS', 'CIEDE', 'ESDE', 'MEDIUNIDADE']
  
  const filteredFacilitators = selectedFilter === 'TODOS' 
    ? facilitatorsData 
    : selectedFilter === 'ciede'.toUpperCase().trim()
    // ? facilitatorsData.filter(f => f.status === 'Disponível')
    ? facilitatorsData.filter(f => f.category.includes('ciede'.toUpperCase().trim()))    
    : selectedFilter === 'esde'.toUpperCase().trim()
    ? facilitatorsData.filter(f => f.category.includes('esde'.toUpperCase().trim()))
    : facilitatorsData.filter(f => f.category.includes('mediunidade'.toUpperCase().trim()))
    

  

  return (
    <View style={styles.container}>
      {/* Header Fixo */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.returnButton}
          activeOpacity={0.6}
          onPress={() => router.push("/studyGroup")}
        >
          <ArrowLeftIcon size={30} color={"white"} />
        </TouchableOpacity>
        <Text style={styles.titleHeader}>Nossos Facilitadores</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Filtros */}
        <View style={styles.filterContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScrollContent}
          >
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  selectedFilter === filter && styles.filterButtonActive
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text style={[
                  styles.filterText,
                  selectedFilter === filter && styles.filterTextActive
                ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Estatísticas */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <UsersIcon size={24} color="#4A90E2" />
            <Text style={styles.statNumber}>{facilitatorsData.length}</Text>
            <Text style={styles.statLabel}>Facilitadores</Text>
          </View>
          <View style={styles.statItem}>
            <UserIcon size={24} color="#4A90E2" />
            <Text style={styles.statNumber}>
              {facilitatorsData.filter(f => f.status === 'Disponível').length}
            </Text>
            <Text style={styles.statLabel}>Disponíveis</Text>
          </View>
          <View style={styles.statItem}>
            <MapPinIcon size={24} color="#4A90E2" />
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Áreas</Text>
          </View>
        </View>

        {/* Lista de Facilitadores */}
        <View style={styles.facilitatorsSection}>
          <Text style={styles.sectionTitle}>Nossa Equipe</Text>
          
          {filteredFacilitators.length > 0 ? (
            <View style={styles.gridContainer}>
              {filteredFacilitators.map((facilitator) => (
              
                <TouchableOpacity
                  key={facilitator.id}
                  style={styles.facilitatorCard}
                  activeOpacity={0.8}
                  onPress={() => router.push({
                    pathname: "/studyGroup/facilitadorDetails",
                    params: { data: JSON.stringify(facilitator) }
                  })}
                >
                  <ImageBackground
                    source={{ uri: facilitator.image }}
                    style={styles.facilitatorImage}
                    imageStyle={styles.facilitatorImageStyle}
                  >
                    {/* <View style={[
                      styles.statusBadge,
                      facilitator.status === 'Disponível' ? styles.statusAvailable : styles.statusAway
                    ]}>
                      <Text style={styles.statusText}>{facilitator.status}</Text>
                    </View> */}
                  </ImageBackground>
                  
                  <View style={styles.facilitatorInfo}>
                    <Text style={styles.facilitatorName} numberOfLines={1}>{facilitator.name}</Text>
                    <Text style={styles.facilitatorcategory} numberOfLines={1}>{facilitator.category}</Text>
                    
                    <View style={styles.facilitatorDetails}>
                      <View style={styles.detailItem}>
                        <ClockIcon size={14} color="#4A90E2" />
                        <Text style={styles.detailText}>{facilitator.experience}</Text>
                      </View>
                      
                      <View style={styles.detailItem}>
                        <CalendarIcon size={14} color="#4A90E2" />
                        <Text style={styles.detailText}>{facilitator.nextLecture}</Text>
                      </View>
                    </View>
                    
                    <Text style={styles.specializationText} numberOfLines={1}>
                      {facilitator.specialization}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhum facilitador encontrado</Text>
            </View>
        )}
        </View>
      </ScrollView>
      <View style={{height: 100}} />
    </View>
  );
};

export default Facilitadores;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003B73",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#003B73',
  },
  returnButton: {
    padding: 4,
  },
  titleHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: "white",
    textAlign: 'center',
  },
  spacer: {
    width: 30,
  },
  scrollView: {
    flex: 1,
  },
  filterContainer: {
    paddingVertical: 16,
  },
  filterScrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  filterButtonActive: {
    backgroundColor: '#4A90E2',
  },
  filterText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  filterTextActive: {
    color: 'white',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    marginHorizontal: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 12,
    color: '#E5E7EB',
  },
  facilitatorsSection: {
    paddingHorizontal: 16,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  facilitatorCard: {
    width: 172, // 16*2 padding + 16 gap
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  facilitatorImage: {
    height: 140,
  },
  facilitatorImageStyle: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  // statusAvailable: {
  //   backgroundColor: '#4A90E2',
  // },
  // statusAway: {
  //   backgroundColor: '#F59E0B',
  // },
  // statusText: {
  //   color: 'white',
  //   fontSize: 10,
  //   fontWeight: 'bold',
  // },
  facilitatorInfo: {
    padding: 12,
    gap: 6,
  },
  facilitatorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  facilitatorcategory: {
    fontSize: 12,
    color: '#4A90E2',
    fontWeight: '500',
  },
  facilitatorDetails: {
    gap: 4,
    marginTop: 4,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#4A90E2',
  },
  specializationText: {
    fontSize: 11,
    color: '#4A90E2',
    fontWeight: '500',
    marginTop: 4,
    fontStyle: 'italic',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    color: 'white',
    fontSize: 16,
  },
});