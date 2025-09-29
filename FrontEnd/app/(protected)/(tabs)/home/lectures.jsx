import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView,
} from "react-native"
import React, { useRef, useState, useMemo } from "react"
import {
  router,
  useLocalSearchParams,
} from "expo-router"
import { ArrowLeftIcon } from "lucide-react-native"
import Carousel from "react-native-reanimated-carousel"
import Button from "../../../../components/Button"
import CustomNavagation from "../../../../components/CustomNavagation"
import EmptyContent from "../../../../components/EmptyContent"

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const Lectures = () => {
  const params = useLocalSearchParams()
  const lectures = params.data ? JSON.parse(params.data) : []
  const [selectedYearIndex, setSelectedYearIndex] = useState(0)
  const [currentIndices, setCurrentIndices] = useState({}) // Índices por ano

  // FUNÇÃO CORRIGIDA - AGORA RETORNA O RESULTADO
  const chuckArray = (array, size) => {
    const result = []
    for(let i = 0; i < array.length; i += size){
      result.push(array.slice(i, i + size))
    }
    return result
  }

  // set é utilizado bastante para fazer com que os itens nao se repetem no array
  const existingYears = [...new Set(lectures.map(lecture => lecture.yearOfPublication))].sort((a, b) => b - a)

  const data = useMemo(() => existingYears.map(years => ({
    id: years,
    name: `Ano ${years}`,
    data: chuckArray(lectures.filter(lecture => lecture.yearOfPublication === years), 10) || [] 
  })), [lectures, existingYears])

  // Handler para mudança de índice específico por ano
  const handleSnapToItem = (index, yearId) => {
    setCurrentIndices(prev => ({
      ...prev,
      [yearId]: index
    }))
  }

  // Handler para quando um ano é selecionado na navegação
  const handleYearSelection = (index) => {
    setSelectedYearIndex(index)
  }

  return (
    <View style={styles.container}>
      {/* Header Fixo */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.returnButton}
          activeOpacity={0.8}
          onPress={() => router.push("/home")}
        >
          <ArrowLeftIcon size={28} color={"white"} />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Text style={styles.titleHeader}>Palestras da Casa</Text>
        </View>
      </View>

      {/* Navegação por anos */}
      <View style={styles.navigationContainer}>
        <CustomNavagation 
          otherStyles={true} 
          trendingItems={data}
          onItemPress={handleYearSelection} // Passa a função de callback
        />
      </View>

      <View style={styles.headerLine} />

      {/* Conteúdo Principal - Mostra apenas o ano selecionado */}
      {data.length > 0 ? (
        <ScrollView>
          {data.map((yearItem, index) => (
            // Mostra apenas o ano selecionado
            index === selectedYearIndex && (
              <View key={yearItem.id} style={styles.yearSection}>
                {/* Título do Ano */}
                {/* <Text style={styles.yearTitle}>{yearItem.name}</Text> */}
                
                {yearItem.data && yearItem.data.length > 0 ? (
                  yearItem.data.map((chunk, chunkIndex) => (
                    <View key={chunkIndex} style={styles.carouselWrapper}>
                      <Carousel
                        width={400}
                        height={250}
                        data={chunk}  
                        onSnapToItem={(itemIndex) => handleSnapToItem(itemIndex, yearItem.id)}
                        renderItem={({ item: lecture }) => (
                          <View style={styles.lectureCard}>
                            <ImageBackground
                              source={require("../../../../assets/images/Jesus-Cristo.png")}
                              style={styles.backgroundImage}
                              imageStyle={styles.imageStyle}
                            >
                              <View style={styles.overlay}>
                                <View style={styles.cardContent}>
                                  <View style={styles.textContainer}>
                                    <Text style={styles.lectureTitle}>{lecture.nameLecture}</Text>
                                    
                                    <View style={styles.lectureInfo}>
                                      <View style={styles.dateTimeBadge}>
                                        <Text style={styles.dateTimeText}>
                                          {new Date(lecture.dateLecture).toLocaleDateString('pt-BR')}
                                        </Text>
                                        <Text style={styles.timeText}>• {lecture.timeLecture}</Text>
                                      </View>
                                      
                                      <Text style={styles.lectureDescription} numberOfLines={2}>
                                        {lecture.description}
                                      </Text>
                                    </View>
                                  </View>
                                  
                                  <Button
                                    title={"Acessar Palestra"}
                                    buttonStyle={styles.accessButton}
                                    textStyle={styles.buttonText}
                                    handlePress={() => {
                                      const encodedData = encodeURIComponent(JSON.stringify(lecture))
                                      const lecturesEncodedData = encodeURIComponent(JSON.stringify(lectures))
                                      router.push(`/home/aboutLecture?data=${encodedData}&lecture=${lecturesEncodedData}`)
                                    }}
                                  />
                                </View>
                              </View>
                            </ImageBackground>
                            
                            <View style={styles.glowEffect} />
                          </View>
                        )}
                        scrollAnimationDuration={800}
                        autoPlay
                        loop
                        autoPlayInterval={4000}
                        mode="parallax"
                        modeConfig={{
                          parallaxScrollingScale: 0.9,
                          parallaxScrollingOffset: 60,
                        }}
                      />
                      
                      {/* Paginação para cada chunk - corrigida para usar o índice específico do ano */}
                      <View style={styles.pagination}>
                        {chunk.map((_, index) => (
                          <View
                            key={index}
                            style={[
                              styles.paginationDot,
                              index === currentIndices[yearItem.id] && styles.paginationDotActive
                            ]}
                          />
                        ))}
                      </View>
                    </View>
                  ))
                ) : (
                  <View style={styles.emptyContainer}>
                    <EmptyContent 
                      title="Ops! Nada por aqui"
                      subtitle={`Nenhuma palestra encontrada para ${yearItem.name}`} 
                    />
                  </View>
                )}
              </View>
            )
          ))}
          <View style={{marginTop: 200}} />
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <EmptyContent 
            title="Nenhum dado disponível"
            subtitle="Não foram encontradas palestras" 
          />
        </View>
      )}
    </View>
  )
}

export default React.memo(Lectures)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003B73",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingHorizontal: 25,
    paddingBottom: 15,
    position: 'relative',
  },
  returnButton: {
    position: 'absolute',
    left: 10,
    top: 60,
    backgroundColor: "#60A3D9",
    borderRadius: 14,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    zIndex: 10,
  },
  headerContent: {
    alignItems: "center",
    flex: 1,
    marginTop: 10,
  },
  titleHeader: {
    fontSize: 24,
    color: "white",
    fontWeight: "800",
    letterSpacing: 0.5,
    textAlign: "center",
    textShadowColor: "rgba(255,255,255,0.15)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
  },
  navigationContainer: {
    paddingHorizontal: 4,
    paddingBottom: 15,
  },
  headerLine: {
    height: 2,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  carouselWrapper: {
    flex: 1,
    alignItems: "center",
    marginBottom: 4
  },
  lectureCard: {
    borderRadius: 24,
    height: 250,
    marginHorizontal: 5,
    overflow: "hidden",
    shadowColor: "#001F3F",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
  },
  imageStyle: {
    borderRadius: 24,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 59, 115, 0.75)",
    padding: 24,
  },
  cardContent: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 20,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  lectureTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 1,
    letterSpacing: 0.3,
    lineHeight: 28,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  lectureInfo: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 14,
    padding: 16,
    marginTop: 8,
    borderLeftWidth: 4,
    borderLeftColor: "rgba(255,255,255,0.4)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dateTimeBadge: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    flexWrap: "wrap",
  },
  dateTimeText: {
    color: "rgba(255,255,255,0.95)",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  timeText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
    fontWeight: "500",
    marginLeft: 6,
  },
  lectureDescription: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
    fontStyle: "italic",
  },
  accessButton: {
    width: 180,
    marginTop: 50,
    alignSelf: "center",
    backgroundColor: "#003B73",
    borderRadius: 14,
    paddingVertical: 0,
    shadowColor: "#001F3F",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  buttonText: {
    color: "#003B73",
    fontWeight: "600",
    fontSize: 15,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  paginationDotActive: {
    width: 24,
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  glowEffect: {
    position: "absolute",
    top: -10,
    right: -10,
    bottom: -10,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 40,
    zIndex: -1,
  }
})