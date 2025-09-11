import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { MenuIcon, Bell } from "lucide-react-native";
import { router } from "expo-router";

import ButtonIcons from "../components/ButtonIcons";
import { AuthContext } from "../context/auth";

const Header = ({ title, onMenuPress }) => {
  const { user } = useContext(AuthContext);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 0,
      }}
    >
      {/* Botão Menu */}
      <ButtonIcons
        color="white"
        size={30}
        handleChange={onMenuPress}
        Icon={({ color, size }) => <MenuIcon color={color} size={size} />}
      />

      {/* Título */}
      <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
        {title}
      </Text>

      {/* Notificação + Avatar */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <ButtonIcons
          color="white"
          size={30}
          Icon={({ color, size }) => <Bell color={color} size={size} />}
        />

        <TouchableOpacity onPress={() => router.push("/settings")}>
          <Image
            source={
              user?.image_profile
                ? {
                    uri: `http://192.168.1.11:3001/uploads/${user.image_profile}?t=${Date.now()}`,
                  }
                : require("../assets/images/default-profile.jpg")
            }
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              borderWidth: 2,
              borderColor: "white",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
