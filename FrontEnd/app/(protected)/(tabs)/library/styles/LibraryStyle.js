import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#003B73",
  },
  sectionContainer: {
    gap: 15,
    marginBottom: 15,
  },
  listContent: {
    paddingHorizontal: 16, // Mesmo padding horizontal do Study Group
    paddingBottom: 100, // Mesmo padding bottom do Study Group
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#fff",
  },
  errorDataFlatlistContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
    justifyContent: "center",
  },
  ContainerHeader: {
    paddingVertical: 10, // Menos espaço no header
    backgroundColor: "#003B73",
  },
  containerIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  IconsContent: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  avatarImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    color: "#fff",
  },
  verTodos: {
    color: "#60A3D9",
    fontWeight: "bold",
    textAlign: "right",
    fontSize: 14,
  },
});
