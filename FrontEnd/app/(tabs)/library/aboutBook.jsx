import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import React, { useMemo, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import CustomNavagation from "../../../components/CustomNavagation";
import { ArrowLeftIcon, Bookmark } from "lucide-react-native";
import { AirbnbRating, Rating } from "react-native-ratings";
import Button from "../../../components/Button";
import ButtonIcons from "../../../components/ButtonIcons";

const AbstractRangeboutBook = () => {
  const [IsFavorite, setIsFavorite] = useState(false)
  const params = useLocalSearchParams();
  const booksUnique = params.data ? JSON.parse(params.data) : [];
  const imageUrl = booksUnique[0].image
    ? `http://192.168.1.17:3001/uploads/${booksUnique[0].image}`
    : null;
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <ArrowLeftIcon size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.favoriteBook}> 
            <ButtonIcons
            color='#60A3D9'
            size={30}
            handleChange={() => setIsFavorite(!IsFavorite)}
            Icon={({ color, size }) => <Bookmark color={color} fill={IsFavorite ? '#60A3D9' : 'transparent'} size={size} />}
          />
          </View>
        </View>

        <View style={styles.headerContent}>
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.image, styles.placeholder]}>
              <Text>Sem imagem</Text>
            </View>
          )}
          <View style={styles.footerHead}>
            <Text style={styles.TitleBook}>{booksUnique[0].nameBook}</Text>
            <Text style={styles.authorBook}>{booksUnique[0].authorBook}</Text>
            <Rating
              type="custom"
              atingColor="#FFD700" // cor das estrelas preenchidas
              ratingBackgroundColor="#d4d4d4" // cor do fundo das estrelas
              tintColor="#003B73" // cor de fundo do componente inteiro
              imageSize={30}
              readonly={false}
              count={4}
              defaultRating={0}
              size={30}
              showRating={false}
            />
          </View>
          <View style={styles.chipContainer}>
            {booksUnique[0].bookCategory === "empréstimo" ? (
              <Text style={[styles.chipText, styles.chip]}>Encomenda</Text>
            ) : null}
            <Text style={[styles.chipText, styles.chip]}>
              {booksUnique[0].tagsBook}
            </Text>
            {booksUnique[0].status_Available === "disponível" && booksUnique[0].bookQuantity > 0 ? (
              <Text
                style={[styles.chipText, styles.chip, styles.chipTextAvailable]}
              >
                Disponível
              </Text>
            ) : <Text
                style={[styles.chipText, styles.chip, styles.chipTextUnAvailable]}
              >
                Indisponível
              </Text>}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(AbstractRangeboutBook);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#003B73",
  },
  container: {
    flex: 1,
  },
  favoriteBook: {
    position: "relative",
    top: 30,
    left: 350,
    zIndex: 1, // Garante que fique acima da imagem
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 8,
    zIndex: 1, // Garante que fique acima da imagem
  },
  headerContent: {
    marginTop: 40,
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
    flexDirection: "column",
  },
  image: {
    width: 220,
    height: 330,
    justifyContent: "flex-end",
    borderRadius: 12,
  },
  TitleBook: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    width: 240,
    textAlign: "center",
  },
  authorBook: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
  footerHead: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    marginTop: 5,
    gap: 10,
  },
  buttonStyle: {
    width: "100%",
    minWidth: 100,
    borderRadius: 35,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginTop: 10,
  },
  chip: {
    backgroundColor: "#71A9F7",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  chipText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  chipTextAvailable: {
    backgroundColor: "#A8DF8E", // Verde pastel suave
    color: "#1F6E1F", 
  }, chipTextUnAvailable: {
    backgroundColor: "#FF9B9B", // Vermelho rosado suave
    color: "#8B0000", 
  }
});
