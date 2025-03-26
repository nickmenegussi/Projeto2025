import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { LibraryIcon, X } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import ButtonIcons from './ButtonIcons';

export default function SideBar({ isOpen, setIsOpen }) {
  const navigation = useNavigation();
  return (
    <View style={[styles.sidebar, { transform: [{ translateX: isOpen ? 0 : -300 }] }]}>
      <View style={styles.backgroundProfileContainer}>
        <ButtonIcons color="white" size={30} handleChange={() => setIsOpen(false)} Icon={({color, size}) => ( 
          <X color={color} size={size} />
        )} />
        <View style={styles.profileContainer}>
          <Image source={require('../assets/images/Jesus-Cristo.png')} style={styles.profileImage} />
          <Text style={styles.profileName}>Your name</Text>
          <Text style={styles.profileSubtext}>View profile</Text>
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.iconText}>📊</Text>
          <Text style={styles.menuText}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Library')}>
          <LibraryIcon size={30} color="white" />
          <Text style={styles.menuText}>Biblioteca</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Lecture')}>
          <Text style={styles.iconText}>🎤</Text>
          <Text style={styles.menuText}>Palestras</Text>
          <View style={styles.badge}><Text style={styles.badgeText}>3</Text></View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('VolunteerWork')}>
          <Text style={styles.iconText}>🤝</Text>
          <Text style={styles.menuText}>Trabalho Voluntário</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Forum')}>
          <Text style={styles.iconText}>💬</Text>
          <Text style={styles.menuText}>Fórum de Discussão</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('CalendarEvents')}>
          <Text style={styles.iconText}>📅</Text>
          <Text style={styles.menuText}>Calendário de Eventos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Notifications')}>
          <Text style={styles.iconText}>🔔</Text>
          <Text style={styles.menuText}>Notificações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Login')}>
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
    height: '110%',
    width: 250,
    backgroundColor: '#60A3D9',
    zIndex: 15
  },
  IconX: {
    padding: 15
  },
  backgroundProfileContainer: {
    backgroundColor: '#003B73',
    padding: 10
  },
  profileContainer: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  profileName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileSubtext: {
    color: 'white',
    fontSize: 12,
  },
  scrollView: {
    flex: 1,
    paddingLeft: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginVertical: 2,
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
