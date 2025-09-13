import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  // ===== ESTILOS GERAIS E DE LAYOUT =====
  linearGradient: {
    flex: 1,
    backgroundColor: "#003B73",
  },
  safeAreaView: {
    flex: 1,
    padding: Platform.OS === 'web' ? 24 : 16,
    paddingVertical: Platform.OS === 'web' ? 20 : 48,
    backgroundColor: "#003B73",
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#003B73",
  },
  
  // ===== LAYOUT ESPECÍFICO PARA WEB =====
  webContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: "#003B73",
  },
  webContent: {
    flex: 1,
    padding: Platform.OS === 'web' ? 24 : 16,
  },
  webMainLayout: {
    flex: 1,
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    marginTop: 20,
    gap: Platform.OS === 'web' ? 24 : 0,
  },
  webLeftColumn: {
    flex: 1,
    marginRight: Platform.OS === 'web' ? 16 : 0,
    maxWidth: Platform.OS === 'web' ? '60%' : '100%',
  },
  webRightColumn: {
    flex: 1,
    maxWidth: Platform.OS === 'web' ? '40%' : '100%',
  },
  webSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      },
      default: {
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      }
    })
  },
  webSectionTitle: {
    fontSize: Platform.OS === 'web' ? 20 : 17,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  
  // ===== CABEÇALHOS E TÍTULOS =====
  Container: {
    backgroundColor: "#003B73",
    marginBottom: Platform.OS === 'web' ? 24 : 16,
  },
  header: {
    fontSize: Platform.OS === 'web' ? 20 : 17,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 25,
    ...Platform.select({
      web: {
        paddingLeft: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#0A73D9'
      }
    })
  },
  headerTitle: {
    color: "white",
    fontSize: Platform.OS === 'web' ? 28 : 24,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    marginBottom: Platform.OS === 'web' ? 20 : 16,
  },
  title: {
    fontSize: Platform.OS === 'web' ? 22 : 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  
  // ===== CARTÕES E CONTAINERS =====
  cardContainer: {
    backgroundColor: Platform.OS === 'web' ? 'rgba(255, 255, 255, 0.08)' : "#003B73",
    padding: Platform.OS === 'web' ? 16 : 10,
    borderRadius: 12,
    marginBottom: Platform.OS === 'web' ? 20 : 16,
    ...Platform.select({
      web: {
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
      }
    })
  },
  containerFaq: {
    marginBottom: Platform.OS === 'web' ? 32 : 40,
  },
  ContainerReviews: {
    position: "relative",
    backgroundColor: "#60A3D9",
    borderRadius: Platform.OS === 'web' ? 12 : 10,
    padding: Platform.OS === 'web' ? 24 : 20,
    ...Platform.select({
      web: {
        boxShadow: '0 6px 16px rgba(0, 59, 115, 0.3)',
      }
    })
  },
  
  // ===== AVATAR E IMAGENS =====
  avatarImage: {
    width: Platform.OS === 'web' ? 50 : 42,
    height: Platform.OS === 'web' ? 50 : 42,
    borderRadius: Platform.OS === 'web' ? 25 : 21,
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
  
  // ===== COMPONENTES DE FORMULÁRIO =====
  picker: {
    height: Platform.OS === 'web' ? 48 : 55,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 0,
    width: Platform.OS === 'web' ? '40%' : "50%",
    ...Platform.select({
      web: {
        padding: 12,
        fontSize: 16,
      }
    })
  },
  itemDropDrown: {
    backgroundColor: "#fff",
    borderWidth: 0,
    borderRadius: 8,
    width: Platform.OS === 'web' ? '40%' : "50%",
  },
  
  // ===== LAYOUT E DISPOSIÇÃO DE ELEMENTOS =====
  containerIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Platform.OS === 'web' ? 20 : 16,
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
    marginBottom: Platform.OS === 'web' ? 20 : 16,
  },
  
  // ===== ITENS DO CAROUSEL =====
  carouselItem: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "flex-start",
    height: Platform.OS === 'web' ? 220 : 200,
  },
  SmallcarouselItem: {
    borderRadius: 10,
    marginRight: 10,
    flexDirection: "column",
    height: Platform.OS === 'web' ? 170 : 150,
  },
  
  // ===== OVERLAY E TÍTULOS DE POSTS =====
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  titlePost: {
    fontSize: Platform.OS === 'web' ? 18 : 16,
    color: "white",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 10,
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
  },
  titlePostBigger: {
    fontSize: Platform.OS === 'web' ? 18 : 16,
    color: "white",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 10,
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
  },
  
  // ===== CARTÕES DE CONTEÚDO =====
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    padding: Platform.OS === 'web' ? 20 : 16,
    marginBottom: Platform.OS === 'web' ? 20 : 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  icon: {
    width: Platform.OS === 'web' ? 56 : 48,
    height: Platform.OS === 'web' ? 56 : 48,
    marginRight: Platform.OS === 'web' ? 20 : 16,
    resizeMode: "contain",
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: Platform.OS === 'web' ? 18 : 16,
    fontWeight: "bold",
    color: "#003B73",
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: Platform.OS === 'web' ? 15 : 14,
    color: "#555",
    lineHeight: Platform.OS === 'web' ? 1.5 : 20,
  },
  
  // ===== CONTAINER DE REVIEWS =====
  reviewsContainer: {
    height: Platform.OS === 'web' ? 320 : 300,
    width: "100%",
    marginVertical: 10,
  },
  
  // ===== BOTÕES =====
  editButton: {
    backgroundColor: "#0A73D9",
    width: Platform.OS === 'web' ? 44 : 40,
    height: Platform.OS === 'web' ? 44 : 40,
    borderRadius: Platform.OS === 'web' ? 22 : 20,
    justifyContent: "center",
    alignItems: "center",
  },
  
  // ===== CALENDÁRIO =====
  calendarSection: {
    marginBottom: Platform.OS === 'web' ? 32 : 30,
  },
  calendar: {
    height: Platform.OS === 'web' ? 400 : 380,
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
    fontSize: Platform.OS === 'web' ? 15 : 14,
  },
  
  // ===== MODAL =====
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: Platform.OS === 'web' ? 16 : 20,
    padding: Platform.OS === 'web' ? 24 : 20,
    width: Platform.OS === 'web' ? '50%' : "90%",
    maxWidth: Platform.OS === 'web' ? 600 : '90%',
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
    fontSize: Platform.OS === 'web' ? 22 : 20,
    fontWeight: "bold",
    color: "#003B73",
    flex: 1,
  },
  closeButton: {
    width: Platform.OS === 'web' ? 34 : 30,
    height: Platform.OS === 'web' ? 34 : 30,
    borderRadius: Platform.OS === 'web' ? 17 : 15,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: Platform.OS === 'web' ? 20 : 18,
    fontWeight: "bold",
    color: "#003B73",
  },
  modalScrollView: {
    maxHeight: 400,
    marginBottom: 10,
  },
  
  // ===== EVENTOS (DENTRO DO MODAL) =====
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
    minWidth: Platform.OS === 'web' ? 80 : 70,
    backgroundColor: "#0A73D9",
    borderRadius: 8,
    padding: 5,
  },
  eventTime: {
    fontSize: Platform.OS === 'web' ? 15 : 14,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
  eventDetails: {
    flex: 1,
  },
  eventName: {
    fontSize: Platform.OS === 'web' ? 17 : 16,
    fontWeight: "bold",
    color: "#003B73",
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: Platform.OS === 'web' ? 15 : 14,
    color: "#666",
    lineHeight: Platform.OS === 'web' ? 1.5 : 20,
  },
  
  // ===== ESTADOS VAZIOS E MENSAGENS =====
  noEventsContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  noEventsText: {
    fontSize: Platform.OS === 'web' ? 17 : 16,
    color: "#888",
    fontStyle: "italic",
    textAlign: "center",
  },
  
  // ===== BOTÃO DE ADICIONAR EVENTO =====
  addEventButton: {
    flexDirection: "row",
    backgroundColor: "#0A73D9",
    borderRadius: 10,
    padding: Platform.OS === 'web' ? 14 : 12,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  addEventText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: Platform.OS === 'web' ? 15 : 14,
  },
});