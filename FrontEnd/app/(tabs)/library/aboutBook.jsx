import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import React, { useMemo } from "react";
import { router, useLocalSearchParams } from "expo-router";
import CustomNavagation from "../../../components/CustomNavagation";
import { ArrowLeftIcon } from "lucide-react-native";

const aboutBook = () => {
  const params = useLocalSearchParams();
  const booksUnique =
    params.data ? JSON.parse(params.data) : []
  
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
            <Text>{booksUnique[0].nameBook}</Text>
            <Text>{booksUnique[0].authorBook}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(aboutBook);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#003B73",
  },
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 16,
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 8,
    zIndex: 1, // Garante que fique acima da imagem
  },
  headerContent: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 250,
    height: 350,
    justifyContent: "flex-end",
    borderRadius: 12,
  },
});
