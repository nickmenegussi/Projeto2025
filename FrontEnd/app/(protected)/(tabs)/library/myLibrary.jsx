import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import ButtonIcons from "../../../../components/ButtonIcons";
import { ArrowLeftIcon } from "lucide-react-native";
import { router } from "expo-router";

const MyLibrary = () => {
  return (
    <FlatList
      data={[]}
      keyExtractor={(item) => item.id}
      renderItem={[]}
      contentContainerStyle={styles.container}
      ListHeaderComponent={() => (
        <>
          <View style={styles.containerHeader}>
            <View style={styles.header}>
              <ButtonIcons
                color="#fff"
                handleChange={() => {}}
                size={24}
                Icon={({ color, size }) => (
                  <ArrowLeftIcon color={color} size={size} />
                )}
              />
              <Text style={styles.headerTitle}>Histórico de Empréstimos</Text>
            </View>z
            <View style={styles.ContainerHeader}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => router.push(`library/historicalLoans`)}
                  style={[styles.button, styles.buttonActive]}
                >
                  <Text style={styles.linkText}>Outra navegacao</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => router.push(`library/historicalLoans`)}
                  style={styles.button}
                >
                  <Text style={styles.linkText}>Livros Favoritos</Text>
                </TouchableOpacity>
                
              </View>
            </View>
            <Text style={styles.TextContainer}>Minha Biblioteca</Text>
            <Text style={styles.titlerRenderItem}>Livros Favoritados</Text>
            {/* <FlatList 
            renderItem={}
            /> */}
          </View>
        </>
      )}
    />
  );
};

export default MyLibrary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#003B73",
  },
  containerHeader: {
    gap: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  TextContainer: {
    color: "white",
    fontSize: 18,
    borderBottomWidth: 3,
    borderBottomColor: "#60A3D9",
    maxWidth: 150,
    textAlign: "left",
    paddingBottom: 4,
  },
  titlerRenderItem: {
    fontSize: 22,
    color: "white",
    marginBottom: 15,
  },
  header: {
  flexDirection: "row",
  alignItems: "center",
  gap: 40,
  padding: 10,
  paddingTop: 50,
  backgroundColor: "#003B73",
  borderBottomWidth: 1,
  borderBottomColor: "rgba(255,255,255,0.1)",
},

headerTitle: {
  fontSize: 18,
  fontWeight: "bold",
  color: "white",
},

ContainerHeader: {
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
},

buttonContainer: {
  flexDirection: "row",
  width: "auto",
  padding: 4,
  borderWidth: 1,
  backgroundColor: "#003B73",
  borderColor: "white",
  borderRadius: 30,
},

button: {
  flex: 1,
  paddingVertical: 8,
  borderRadius: 30,
  alignItems: "center",
  justifyContent: "center",
},

buttonActive: {
  backgroundColor: "#60A3D9",
},

linkText: {
  textAlign: "center",
  color: "white",
  fontWeight: "500",
  fontSize: 13,
},
});
