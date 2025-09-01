import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ReservationStatus = ({ onCartPress, onHistoryPress }) => {
  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onCartPress}>
        <Text style={styles.icon}>🛒</Text>
        <Text style={styles.title}>Pedidos no Carrinho</Text>
        <Text style={styles.subtitle}>Veja os livros que você vai reservar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onHistoryPress}>
        <Text style={styles.icon}>📚</Text>
        <Text style={styles.title}>Histórico de Reservas</Text>
        <Text style={styles.subtitle}>Acompanhe suas reservas anteriores</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 14,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#003B73',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    marginHorizontal: 2,
  },
  icon: {
    fontSize: 32,
    marginBottom: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003B73',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },
});

export default ReservationStatus;