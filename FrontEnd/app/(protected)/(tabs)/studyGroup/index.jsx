import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Alert,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import ButtonIcons from "../../../../components/ButtonIcons";
import { Bell, CircleUserRoundIcon, MenuIcon } from "lucide-react-native";
import { router } from "expo-router";
import Trending from "../../../../components/Navagation";
import api from "../../../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Carousel from "react-native-reanimated-carousel";

const HomeStudyGroup = () => {
  const [lectures, setLectures] = useState([]);

  const item = [
    { id: 1, type: "Grupo de Estudo CIEDE", content: lectures },
    { id: 2, type: "Grupo de Estudo ESDE" },
    { id: 3, type: "Grupo de Estudo Mediúnicos" },
    { id: 4, type: "Outro Grupo de Estudo" },
  ];

  async function ViewLectures() {
    try {
      const token = await AsyncStorage.getItem("@Auth:token");
      const response = await api.get("/lectures/lectures", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setLectures(response.data.data);
    } catch (error) {
      if (error.response) {
        if (error.response.data.loginRequired === true) {
          console.log("Erro", error.response.data);
          Alert.alert("Erro", error.response.data.message);
          router.push("/sign-up");
        } else {
          console.log("Erro", error.response.data);
          Alert.alert("Erro", error.response.data.message);
        }
      } else {
        console.log("Erro", error);
      }
    }
  }
  useEffect(() => {
    ViewLectures();
  }, []);

  const headerSection = () => {
    return (
      <View contentContainerStyle={styles.Container}>
        <View style={styles.containerIcons}>
          <ButtonIcons
            color={"white"}
            size={30}
            handleChange={() => setIsSideBarOpen(!IsSideBarOpen)}
            Icon={({ color, size }) => <MenuIcon color={color} size={size} />}
          />
          <View style={styles.IconsContent}>
            <ButtonIcons
              color={"white"}
              size={30}
              Icon={({ color, size }) => <Bell color={color} size={size} />}
            />
            <ButtonIcons
              color={"white"}
              size={30}
              handleChange={() => router.push("/settings")}
              Icon={({ color, size }) => (
                <CircleUserRoundIcon color={color} size={size} />
              )}
            />
          </View>
        </View>
        <Trending
          navagations={
            [
              {
                name: "Palestras da Casa",
                path: "/home/lectures",
                data: [],
              },

              { name: "FAQ", path: "/home/faq" },
            ] ?? []
          }
        />
      </View>
    );
  };

  const renderItem = ({ item }) => {
    switch (item.type.toLowerCase()) {
      case "Grupo de Estudo CIEDE".toLowerCase():
        return (
           <View style={styles.containerTextGroup}>
          <View>
            <Text style={styles.TextStudyGroup}>{item.type}</Text>
          </View>
          <Carousel
            width={350}
            height={170}
            data={item.content}
            renderItem={(carouselItem) => (
              <View
                style={styles.SmallcarouselItem}
                key={carouselItem.item.idLecture}
              >
                <ImageBackground
                  source={require("../../../../assets/images/Jesus-Cristo.png")}
                  style={styles.BackgroundImage}
                  imageStyle={styles.imageStyle}
                >
                  <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={0.5}
                    onPress={() =>
                      router.push({
                        pathname: "/home/lectures",
                        params: { data: JSON.stringify(lectures) },
                      })
                    }
                  >
                    <View style={styles.item}>
                      <Text style={styles.titlePost}>
                        {carouselItem.item.nameLecture}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            )}
            scrollAnimationDuration={800}
            autoPlay={true}
            loop={true}
            autoPlayInterval={3000}
            windowSize={3}
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10],
            }}
            mode="vertical-stack"
            modeConfig={{
              stackInterval: 20,
              opacityInterval: 0.4,
              scaleInterval: 0.1,
            }}

          />
        </View>
        );
      case "Grupo de Estudo ESDE".toLowerCase():
        return (
          <View style={styles.containerTextGroup}>
            <Text style={styles.TextStudyGroup}>{item.type}</Text>
            <Text style={styles.comingSoon}>Em breve...</Text>
          </View>
        );
      case "Grupo de Estudo Mediúnicos".toLowerCase():
        return (
          <View style={styles.containerTextGroup}>
            <Text style={styles.TextStudyGroup}>{item.type}</Text>
            <Text style={styles.comingSoon}>Em breve...</Text>
          </View>
        );
      default:
        return (
          <View style={styles.containerTextGroup}>
            <Text style={styles.TextStudyGroup}>{item.type}</Text>
            <Text style={styles.comingSoon}>Em breve...</Text>
          </View>
        );
    }
  };
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <FlatList
        data={item}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListHeaderComponent={headerSection}
        contentContainerStyle={{ paddingBottom: 100, paddingVertical: 38 }}
      />
    </SafeAreaView>
  );
};

export default HomeStudyGroup;

const styles = StyleSheet.create({
  Container: {
    flexGrow: 1,
    padding: 10,
    paddingVertical: 20,
  },
  safeAreaView: {
    flex: 1,
    padding: 10,
    paddingVertical: 10,
    backgroundColor: "#003B73",
  },
  containerTextGroup: {
    marginBottom: 20,
    marginTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  TextStudyGroup: {
    color: "#E0E0E0",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingBottom: 5,
  },
  containerIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  IconsContent: {
    flexDirection: "row",
    gap: 10,
  },

  containerIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  IconsContent: {
    flexDirection: "row",
    gap: 10,
  },

  // ESTILOS NECESSÁRIOS PARA O CAROUSEL:
  SmallcarouselItem: {
    borderRadius: 10,
    marginRight: 10,
    flex: 1,
    flexDirection: "column",
  },
  BackgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  imageStyle: {
    borderRadius: 10,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 10,
  },
  item: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
  },
  titlePost: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },  containerTextGroup: {
    marginBottom: 20,
    marginTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  TextStudyGroup: {
    color: "#E0E0E0",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingBottom: 5,
  },
}); 
