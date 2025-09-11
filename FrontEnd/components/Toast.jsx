// components/Toast.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Toast = ({ visible, message, type, onHide }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onHide, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  const iconName = type === 'success' ? 'check-circle' : 'exclamation-circle';
  const backgroundColor = type === 'success' ? '#4CAF50' : '#F44336';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Icon name={iconName} size={20} color="#FFF" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  message: {
    color: '#FFF',
    marginLeft: 10,
    fontSize: 16,
  },
});

export default Toast;