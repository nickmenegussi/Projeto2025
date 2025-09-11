import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // Estilos gerais e de layout
  linearGradient: {
    flex: 1,backgroundColor: "#003B73",
  },
  safeAreaView: {
    flex: 1,
    padding: 16,
    paddingVertical: 48,
    backgroundColor: "#003B73",
  },
  container: {
    flexGrow: 1,backgroundColor: "#003B73",
  },
  
  // Cabeçalhos e títulos
  Container: {
    backgroundColor: "#003B73",
  },
  header: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 25,
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  
  // Cartões e containers
  cardContainer: {
    backgroundColor: "#003B73",
    padding: 10,
    borderRadius: 10,
  },
  containerFaq: {
    marginBottom: 40,
  },
  ContainerReviews: {
    position: "relative",
    backgroundColor: "#60A3D9",
    borderRadius: 10,
    padding: 20,
  },
  
  // Avatar e imagens
  avatarImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
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
  
  // Componentes de formulário
  picker: {
    height: 55,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 0,
    width: "50%",
  },
  itemDropDrown: {
    backgroundColor: "#fff",
    borderWidth: 0,
    borderRadius: 8,
    width: "50%",
  },
  
  // Layout e disposição de elementos
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
  reviewsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  
  // Itens do carousel
  carouselItem: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "flex-start",
    height: 200,
  },
  SmallcarouselItem: {
    borderRadius: 10,
    marginRight: 10,
    flexDirection: "column",
    height: 150,
  },
  
  // Overlay e títulos de posts
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  titlePost: {
    fontSize: 16,
    color: "white",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 10,
  },
  titlePostBigger: {
    fontSize: 16,
    color: "white",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 10,
  },
  
  // Cartões de conteúdo
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  icon: {
    width: 48,
    height: 48,
    marginRight: 16,
    resizeMode: "contain",
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#003B73",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: "#555",
  },
  
  // Container de reviews
  reviewsContainer: {
    height: 300,
    width: "100%",
    marginVertical: 10,
  },
  
  // Botões
  editButton: {
    backgroundColor: "#0A73D9",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  
  // CALENDÁRIO
  calendarSection: {
    marginBottom: 30,
  },
  calendar: {
    height: 380,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  selectDateHint: {
    textAlign: "center",
    color: "#fff",
    fontStyle: "italic",
    marginTop: 10,
    fontSize: 14,
  },
  
  // MODAL
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#003B73",
    flex: 1,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#003B73",
  },
  modalScrollView: {
    maxHeight: 400,
    marginBottom: 10,
  },
  
  // EVENTOS (dentro do modal)
  eventItem: {
    flexDirection: "row",
    backgroundColor: "#F8F9FA",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#0A73D9",
  },
  eventTimeContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    minWidth: 70,
    backgroundColor: "#0A73D9",
    borderRadius: 8,
    padding: 5,
  },
  eventTime: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
  eventDetails: {
    flex: 1,
  },
  eventName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#003B73",
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  
  // Estados vazios e mensagens
  noEventsContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  noEventsText: {
    fontSize: 16,
    color: "#888",
    fontStyle: "italic",
    textAlign: "center",
  },
  
  // Botão de adicionar evento
  addEventButton: {
    flexDirection: "row",
    backgroundColor: "#0A73D9",
    borderRadius: 10,
    padding: 12,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  addEventText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 14,
  },
});