import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Animated,
} from "react-native"
import React, { useRef, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import {
  router,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router"
import { ArrowLeftIcon, Icon } from "lucide-react-native"
import Trending from "../../../components/Navagation"
import Carousel from "react-native-reanimated-carousel"
import Button from "../../../components/Button"

const Lectures = () => {
  const [selectedIndex, setSelecetIndex] = useState(0)
  const translateX = useRef(new Animated.Value(0)).current // Controle da posição do sublinhado

  // Função para mover suavemente o sublinhado
  const handlePress = (index) => {
    setSelecetIndex(index)
    Animated.spring(translateX, {
      toValue: index * 110, // Multiplica pelo tamanho do item (ajuste se necessário)
      useNativeDriver: true,
    }).start()
  }
  const trendingItems = [{name: 'Ano 2025'}, {name: 'Ano 2024'}, {name: 'Ano 2023'}]

  const params = useLocalSearchParams()
  const lectures = params.data ? JSON.parse(params.data) : []
  console.log(lectures)
  return (
    <ScrollView style={styles.BackGroundSafeArea}>
      <View style={styles.HeaderComponent}>
        <TouchableOpacity
          style={styles.ReturnButton}
          activeOpacity={0.6}
          onPress={() => router.push("/home")}
        >
          <ArrowLeftIcon size={30} color={"white"} />
        </TouchableOpacity>
        <View>
          <View style={styles.ContentContainer}>
            <Text style={styles.TitleHeader}>Palestras da Casa</Text>
            <View style={styles.trendingContainer}>
              {trendingItems.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => handlePress(index)} style={styles.trendingItems} >
                  <Text style={styles.navText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
              <Animated.View style={[styles.underline, { transform: [{ translateX }] }]} />

          </View>
          <View style={styles.line}></View>
        </View>
      </View>
      <Carousel
        width={370}
        height={200}
        data={lectures}
        renderItem={({ item }) => (
          <View style={styles.ContainerItems}>
            <ImageBackground
              source={require("../../../assets/images/Jesus-Cristo.png")} // URL da sua imagem
              style={styles.BackgroundImage}
              imageStyle={styles.imageStyle}
            >
              <View style={styles.overlay}>
                <View style={styles.Items}>
                  <Text style={styles.titleContent}>{item.nameLecture}</Text>
                  <Button
                    title={"Acessar Palestra"}
                    buttonStyle={styles.Button}
                    handlePress={() => {
                      const encondedData = encodeURIComponent(JSON.stringify(item))
                      router.push(`/home/aboutLecture?data=${encondedData}`)}}
                  />
                </View>
              </View>
            </ImageBackground>
          </View>
        )}
        scrollAnimationDuration={1000}
        autoPlay
        loop
        autoPlayInterval={3000}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.85,
          parallaxScrollingOffset: 80,
        }}
      />
      <Carousel
        width={370}
        height={200}
        data={lectures}
        renderItem={({ item }) => (
          <View style={styles.ContainerItems}>
            <ImageBackground
              source={require("../../../assets/images/Jesus-Cristo.png")} // URL da sua imagem
              style={styles.BackgroundImage}
              imageStyle={styles.imageStyle}
            >
              <View style={styles.overlay}>
                <View style={styles.Items}>
                  <Text style={styles.titleContent}>{item.nameLecture}</Text>
                  <Button
                    title={"Acessar Palestra"}
                    buttonStyle={styles.Button}
                  />
                </View>
              </View>
            </ImageBackground>
          </View>
        )}
        scrollAnimationDuration={1000}
        autoPlay
        loop
        autoPlayInterval={3000}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.85,
          parallaxScrollingOffset: 80,
        }}
      />
      <Carousel
        width={370}
        height={200}
        data={lectures}
        renderItem={({ item }) => (
          <View style={styles.ContainerItems}>
            <ImageBackground
              source={require("../../../assets/images/Jesus-Cristo.png")} // URL da sua imagem
              style={styles.BackgroundImage}
              imageStyle={styles.imageStyle}
            >
              <View style={styles.overlay}>
                <View style={styles.Items}>
                  <Text style={styles.titleContent}>{item.nameLecture}</Text>
                  <Button
                    title={"Acessar Palestra"}
                    buttonStyle={styles.Button}
                    handlePress={() => 
                      
                      router.navigate('/aboutLecture')}
                  />
                </View>
              </View>
            </ImageBackground>
          </View>
        )}
        scrollAnimationDuration={1000}
        autoPlay
        loop
        autoPlayInterval={3000}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.85,
          parallaxScrollingOffset: 80,
        }}
      />
    </ScrollView>
  )
}

export default Lectures

const styles = StyleSheet.create({
  BackGroundSafeArea: {
    backgroundColor: "#003B73",
    flex: 1,
  },
  itemText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  ReturnButton: {
    top: 30,
    left: 10,
  },
  HeaderComponent: {
    gap: 70,
    paddingVertical: 20,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  TitleHeader: {
    fontSize: 25,
    color: "white",
  },
  ContentContainer: {
    paddingLeft: 10,
    flex: 1,
    gap: 20
  },
  ContainerItems: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 170,
    marginRight: 10,
    flex: 1,
    flexDirection: "colmun",
  },
  titleContent: {
    color: "black",
    fontSize: 14,
  },
  Button: {
    width: 150,
  },
  Items: {
    flex: 1,
    marginTop: 40,
    gap: 40,
    left: 20,
  },
  BackgroundImage: {
    flex: 1,
    justifyContent: "center",
  },
  imageStyle: {
    borderRadius: 10,
    backgroundColor: "blac",
  },
  overlay: {
    flex: 1,
    justifyContent: "center", // Garante que o conteúdo fique no centro
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Escurecimento suave
    borderRadius: 10,
  }, trendingContainer: {
    flexDirection: "row",
    marginTop: 10,
    position: "relative",
    marginBottom: 30,
    gap: 10,
  },
  trendingItems: {
    width: 100,
    alignItems: 'center',
    backgroundColor: '#60A3D9',
    borderRadius: 10,
    justifyContent: 'center',
    height: 30
  },underline: {
    position:'absolute',
    bottom: 0,
    left: 10,
    width: 100, // Deve ser igual à largura do item
    height: 8,
    backgroundColor: "#60A3D9",
    borderRadius: 10,
  }, navText: {
    color: 'white',
    textAlign: "center",
    paddingHorizontal: 10
    }
})
