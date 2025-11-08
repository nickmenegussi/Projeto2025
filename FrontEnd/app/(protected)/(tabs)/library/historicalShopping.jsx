import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import ButtonIcons from "../../../../components/ButtonIcons";
import { ArrowLeftIcon, Calendar, Clock, BookOpen, Library } from "lucide-react-native";
import useLoan from "../../../../hooks/useLoan";
import useReservation from "../../../../hooks/useReservation";
import EmptyContent from "../../../../components/EmptyContent";
import Constants from 'expo-constants';

const HistoricalLoans = () => {
  const { loan, hasLoan, loading: loansLoading } = useLoan();
  const { reservation, hasReservation, loading: reservesLoading } = useReservation();
  const [activeTab, setActiveTab] = useState('loans'); // 'loans' ou 'reserves'
  const { enderecoUrlImage } = Constants.expoConfig.extra;

  const loading = loansLoading || reservesLoading;

  const currentData = activeTab === 'loans' ? loan : reservation;

  const getStatusStyle = (returnDate, type = 'loan') => {
    const today = new Date();
    const returnDateObj = new Date(returnDate);
    const daysUntilReturn = Math.ceil((returnDateObj - today) / (1000 * 60 * 60 * 24))

    if (type === 'reserve') {
      if (daysUntilReturn < 0) {
        return { 
          backgroundColor: '#FF6B6B', 
          text: 'Reserva Expirada',
          icon: '❌'
        };
      } else if (daysUntilReturn <= 1) {
        return { 
          backgroundColor: '#FFA726', 
          text: 'Vence Hoje',
          icon: '⏰'
        };
      } else {
        return { 
          backgroundColor: '#9C27B0', 
          text: 'Reserva Ativa',
          icon: '📋'
        };
      }
    } else {
      if (daysUntilReturn < 0) {
        return { 
          backgroundColor: '#FF6B6B', 
          text: 'Atrasado',
          icon: '⚠️'
        };
      } else if (daysUntilReturn <= 3) {
        return { 
          backgroundColor: '#FFA726', 
          text: 'Próximo do vencimento',
          icon: '⏰'
        };
      } else {
        return { 
          backgroundColor: '#4CAF50', 
          text: 'Em dia',
          icon: '✅'
        };
      }
    }
  };

  const getCategoryInfo = (type = 'loan') => {
    if (type === 'reserve') {
      return { 
        name: 'Reserva', 
        color: '#9C27B0',
        icon: '📋'
      };
    } else {
      return { 
        name: 'Empréstimo', 
        color: '#007AFF',
        icon: '📚'
      };
    }
  };

  const getDateLabels = (type = 'loan') => {
    if (type === 'reserve') {
      return {
        startLabel: 'Data da Reserva',
        endLabel: 'Validade da Reserva'
      };
    } else {
      return {
        startLabel: 'Data do Empréstimo',
        endLabel: 'Devolução Prevista'
      };
    }
  };

  if (loading) { 
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ButtonIcons
          color="#fff"
          handleChange={() => router.back()}
          size={24}
          Icon={({ color, size }) => (
            <ArrowLeftIcon color={color} size={size} />
          )}
        />
        <Text style={styles.headerTitle}>Meus Livros</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Navegação entre Empréstimos e Reservas */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => router.back('/cart')}
          activeOpacity={0.7}
          style={
            styles.button
          }
        >
          <Text style={styles.linkText}>Processando</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('loans')}
          activeOpacity={0.7}
          style={[
            styles.button,
            activeTab === 'loans' && styles.buttonActive
          ]}
        >
          <Text style={styles.linkText}>Empréstimos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('reserves')}
          activeOpacity={0.7}
          style={[
            styles.button,
            activeTab === 'reserves' && styles.buttonActive
          ]}
        >
          <Text style={styles.linkText}>Reservas</Text>
        </TouchableOpacity>
      </View>

      {/* Lista */}
      <FlatList
        contentContainerStyle={styles.containerFlatlist}
        data={currentData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item }) => {
          const status = getStatusStyle(item.returnDate, activeTab === 'reserves' ? 'reserve' : 'loan');
          const category = getCategoryInfo(activeTab === 'reserves' ? 'reserve' : 'loan');
          const dateLabels = getDateLabels(activeTab === 'reserves' ? 'reserve' : 'loan');
          
          return (
            <View style={styles.card}>
              <View style={[styles.categoryHeader, { backgroundColor: category.color }]}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryText}>{category.name}</Text>
              </View>

              <View style={styles.cardContent}>
                <View style={styles.mainContent}>
                  <Image
                    source={{
                      uri: item.image
                        ? `${enderecoUrlImage}/uploads/${item.image}`
                        : null,
                    }}
                    style={styles.image}
                  />
                  
                  <View style={styles.textContent}>
                    <Text style={styles.bookTitle} numberOfLines={2}>
                      {item.nameBook}
                    </Text>
                    <Text style={styles.bookAuthor} numberOfLines={1}>
                      {item.authorBook}
                    </Text>
                    
                    <View style={styles.quantityBadge}>
                      <BookOpen size={12} color="#FFFFFF" />
                      <Text style={styles.quantityText}>
                        {item.quantity} {item.quantity > 1 ? 'unidades' : 'unidade'}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.datesContainer}>
                  <View style={styles.dateRow}>
                    <View style={styles.dateItem}>
                      <Calendar size={16} color={category.color} />
                      <View style={styles.dateTextContainer}>
                        <Text style={styles.dateLabel}>{dateLabels.startLabel}</Text>
                        <Text style={styles.dateValue}>
                          {new Date(item.date_at_create).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.dateItem}>
                      <Clock size={16} color={category.color} />
                      <View style={styles.dateTextContainer}>
                        <Text style={styles.dateLabel}>{dateLabels.endLabel}</Text>
                        <Text style={styles.dateValue}>
                          {new Date(item.returnDate).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.footer}>
                  <View style={styles.statusContainer}>
                    <Text style={styles.statusIcon}>{status.icon}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: status.backgroundColor }]}>
                      <Text style={styles.statusText}>{status.text}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.libraryContainer}>
                    <Library size={12} color={category.color} />
                    <Text style={[styles.libraryName, { color: category.color }]}>
                      Gabriel Delanne
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <EmptyContent
              title={activeTab === 'loans' ? "Nenhum empréstimo ativo" : "Nenhuma reserva ativa"}
              subtitle={activeTab === 'loans' 
                ? "Pegue um empréstimo do seu próximo livro favorito" 
                : "Faça uma reserva do seu próximo livro favorito"
              }
              actionText="Explorar Biblioteca"
              onAction={() => router.push("/library")}
            />
          </View>
        }
      />
    </View>
  );
};

export default HistoricalLoans;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#003B73",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#003B73",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "95%",
    padding: 4,
    marginHorizontal: "auto",
    marginVertical: 12,
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
  containerFlatlist: {
    padding: 16,
    paddingBottom: 320,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    overflow: "hidden",
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  categoryIcon: {
    fontSize: 14,
  },
  categoryText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  cardContent: {
    padding: 16,
  },
  mainContent: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 12,
    backgroundColor: "#F8F9FA",
  },
  textContent: {
    flex: 1,
    gap: 8,
  },
  bookTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#003B73",
    lineHeight: 22,
  },
  bookAuthor: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  quantityBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#003B73",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  quantityText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
  },
  datesContainer: {
    marginBottom: 16,
  },
  dateRow: {
    gap: 12,
  },
  dateItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dateTextContainer: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 11,
    color: "#888",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  dateValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusIcon: {
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  libraryContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  libraryName: {
    fontSize: 11,
    fontWeight: "600",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#003B73",
    gap: 16,
  },
  loadingText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 400,
  },
});