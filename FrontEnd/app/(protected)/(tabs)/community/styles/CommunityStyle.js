import { StyleSheet } from "react-native";

export default StyleSheet.create({
   Container: {
    flex: 1,
    backgroundColor: "#003B73", // fundo azul
    paddingTop: 32,
  },
  conteinerFlatlist: {
    padding: 16,
    flexGrow: 1,
    paddingBottom: 180,
    backgroundColor: "#003B73", // Azul escuro que complementa o #4A90E2
  },
  headerComponent: {
    paddingBottom: 15,
    borderBottomWidth: 1,
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)", // Borda mais suave
  },
  logo: {
    width: 80,
    height: 80,
  },
  postCard: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#4A90E2", // Azul principal mantido
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    borderRadius: 16,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerPostCard: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  userName: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  userHandle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
  },
  postTime: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    marginTop: 2,
  },
  topicBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.2)", // Fundo branco transparente
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 6,
  },
  topicText: {
    color: "white",
    fontSize: 11,
    fontWeight: "600",
  },
  postContent: {
    fontSize: 15,
    color: "white",
    marginVertical: 12,
    lineHeight: 22,
  },
  postImage: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  footerCardPost: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.2)",
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.15)", // Fundo mais claro para contraste
  },
  emptyText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
    fontStyle: "italic",
  },
  addPost: {
    position: "absolute",
    right: 20,
    bottom: 140,
    borderRadius: 28,
    width: 56,
    height: 56,
    backgroundColor: "#4A90E2", // Mesma cor do postCard
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
  },
});
