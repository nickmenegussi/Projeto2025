import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import React from "react";
import { Bell, CircleUserRoundIcon } from "lucide-react-native";
import ButtonIcons from "../../../../components/ButtonIcons";

const Index = () => {
  return (
    <FlatList
      contentContainerStyle={styles.conteinerFlatlist}
      ListHeaderComponent={() => (
        <View style={styles.headerComponent}>
          <ButtonIcons
            color={"white"}
            size={38}
            handleChange={() => router.push("/settings")}
            Icon={({ color, size }) => (
              <CircleUserRoundIcon color={color} size={size} />
            )}
          />
          <Image
            source={require("../../../../assets/images/icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <ButtonIcons
            color={"white"}
            size={30}
            Icon={({ color, size }) => <Bell color={color} size={size} />}
          />
        </View>
      )}
    />
  );
};

export default Index;

const styles = StyleSheet.create({
  conteinerFlatlist: {
    flexGrow: 1,
    padding: 15,
    backgroundColor: "#003B73",
  },
  headerComponent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#003B73",
    paddingTop: 20,
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#fff",
  },
  logo: {
    width: 80,
    height: 80,
  },
});
