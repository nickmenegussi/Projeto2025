import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Animated,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { X } from 'lucide-react-native';
import ButtonIcons from './ButtonIcons';
import { router } from 'expo-router';
import { AuthContext } from '../context/auth';

export default React.memo(function SideBar({ isOpen, setIsOpen, data }) {
  const {user} = useContext(AuthContext)
  const [nameUser, setNameUser] = useState()
  const slideAnim = useRef(new Animated.Value(-300)).current;


  useEffect(() => {
    if(user) {
      setNameUser(user.nameUser)
    } else {
      console.log('No user data available');
    }
  }, [user])
  
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : -300,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  return (
    <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
      <View style={styles.header}>
        <ButtonIcons
          color="white"
          size={28}
          handleChange={() => setIsOpen(false)}
          Icon={({ color, size }) => <X color={color} size={size} />}
        />

        <View style={styles.profileContainer}>
          <Image source={require('../assets/images/Jesus-Cristo.png')} style={styles.profileImage} />
          <Text style={styles.profileName}>{nameUser}</Text>
          <Text style={styles.profileSubtext}>Body text goes here</Text>
        </View>
      </View>

      <ScrollView style={styles.menuContainer}>
        {data ? (
          data.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => {
                setIsOpen(false);
                if (item.route) {
                  router.push(item.route);
                }
              }}
            >
              <Text style={styles.menuText}>{item.label}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={{ color: 'white' }}>No data available</Text>
        )}
      </ScrollView>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '110%',
    width: 260,
    backgroundColor: '#60A3D9', // Azul escuro
    zIndex: 15,
  },
  header: {
    backgroundColor: '#003B73',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'white',
  },
  profileName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  profileSubtext: {
    color: '#D1D5DB',
    fontSize: 12,
  },
  menuContainer: {
    flex: 1,
  },
  menuItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ffffff40',
  },
  menuText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
});
