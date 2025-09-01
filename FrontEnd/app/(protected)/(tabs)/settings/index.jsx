import {
  ArrowLeftIcon,
  BugIcon,
  LogOutIcon,
  UserPlusIcon,
  User2Icon,
} from "lucide-react-native";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { router } from "expo-router";
import React, { useContext } from "react";
import { AuthContext, AuthProvider } from "../../../../context/auth";

const HomeSettings = () => {
  const { logout } = useContext(AuthContext);

  const sections = [
    {
      title: "Account",
      data: [
        {
          id: 1,
          title: "Editar Perfil",
          icon: User2Icon,
          path: "/settings/editProfile",
        },
      ],
    },
    {
      title: "Actions",
      data: [
        {
          id: 2,
          title: "Reportar um problema",
          icon: BugIcon,
          path: "/settings/reportAProblem",
        },
        {
          id: 3,
          title: "Adicionar conta",
          icon: UserPlusIcon,
          path: "/settings/addAccount",
        },
        {
          id: 4,
          title: "Sair da conta",
          icon: LogOutIcon,
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.returntoPage}
          onPress={() => router.back()}
        >
          <ArrowLeftIcon size={26} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configurações</Text>
      </View>

      <View style={styles.container}>
        {sections.map((section) => (
          <View key={section.data[0].id} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionBox}>
              {section.data.map((item) => {
                const Icon = item.icon;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.itemContainer}
                    onPress={() => {
                      item.title.includes("Sair da conta")
                        ? logout()
                        : router.push(item.path);
                    }}
                    activeOpacity={0.8}
                  >
                    <Icon size={20} color="#fff" style={{ marginRight: 10 }} />
                    <Text style={styles.itemText}>{item.title}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default React.memo(HomeSettings);

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
