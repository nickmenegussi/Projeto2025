import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LibraryIcon } from 'lucide-react-native';  // Make sure to install the react-native lucide-icons package if available, or use custom icons.
import { useNavigation } from '@react-navigation/native';

export default function SideBar({ isOpen }) {
  const navigation = useNavigation();
  return (
    <View style={[styles.sidebar, { transform: [{ translateX: isOpen ? 0 : -300 }] }]}>
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Text style={styles.iconText}>📊</Text>
          <Text style={styles.menuText}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Library')}
        >
          <LibraryIcon size={30} />
          <Text style={styles.menuText}>Biblioteca</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Lecture')}
        >
          <Text style={styles.iconText}>🎤</Text>
          <Text style={styles.menuText}>Palestras</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>

        {/* {(role.status_permission === 'SuperAdmin' || role.status_permission === 'admin') && (
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Users')}
          >
            <Text style={styles.iconText}>👥</Text>
            <Text style={styles.menuText}>Usuários</Text>
          </TouchableOpacity>
        )} */}

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('VolunteerWork')}
        >
          <Text style={styles.iconText}>🤝</Text>
          <Text style={styles.menuText}>Trabalho Voluntário</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Forum')}
        >
          <Text style={styles.iconText}>💬</Text>
          <Text style={styles.menuText}>Forúm de Discussão</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('CalendarEvents')}
        >
          <Text style={styles.iconText}>📅</Text>
          <Text style={styles.menuText}>Calendário de Eventos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Notifications')}
        >
          <Text style={styles.iconText}>🔔</Text>
          <Text style={styles.menuText}>Notificações</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.iconText}>🔑</Text>
          <Text style={styles.menuText}>Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: 250,
    backgroundColor: '#3B82F6', // Blue color (adjust as needed)
    paddingTop: 40,
    paddingLeft: 10,
    zIndex: 15
  },
  scrollView: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
  },
  iconText: {
    fontSize: 20,
    color: 'white',
  },
  menuText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
  badge: {
    backgroundColor: '#60A5FA',
    borderRadius: 999,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
  },
});
