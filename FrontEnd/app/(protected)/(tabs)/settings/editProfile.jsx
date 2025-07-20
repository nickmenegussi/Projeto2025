import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeftIcon,
  BugIcon,
  LogOutIcon,
  UserPlusIcon,
} from "lucide-react-native";
import FormField from "../.../../../../../components/FormField";

const EditProfile = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.returntoPage}
          onPress={() => router.back()}
        >
          <ArrowLeftIcon size={26} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Perfil</Text>
      </View>

      <View style={styles.container}>
        <FormField />
        <FormField />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#003B73",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    marginTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff22",
  },
  returntoPage: {
    position: "absolute",
    left: 10,
    backgroundColor: "#60A3D9",
    borderRadius: 10,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },
  container: {
    padding: 10,
    gap: 20,
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginLeft: 5,
  },
  sectionBox: {
    backgroundColor: "#1E3D59",
    borderRadius: 12,
    padding: 10,
    gap: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#295B8D",
    padding: 12,
    borderRadius: 8,
  },
  itemText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
});

export default EditProfile;
