import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  useWindowDimensions,
  Platform,
  Easing,
  BackHandler,
  TouchableWithoutFeedback,
} from "react-native";
import { X, User, ChevronRight, LogOut } from "lucide-react-native";
import ButtonIcons from "./ButtonIcons";
import { router } from "expo-router";
import { AuthContext } from "../context/auth";

export default React.memo(function SideBar({ isOpen, setIsOpen, data }) {
  const { user, signOut } = useContext(AuthContext);
  const [nameUser, setNameUser] = useState("");
  const { width, height } = useWindowDimensions();
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  // Definir a largura baseada no tipo de dispositivo
  const sidebarWidth = useMemo(() => {
    // Para web/tablet, usar largura maior
    if (Platform.OS === 'web') {
      return width >= 1024 ? 380 : width >= 768 ? 320 : 280;
    }
    // Para mobile, manter a largura original com ajustes
    return width > 400 ? 280 : 260;
  }, [width]);

  useEffect(() => {
    if (user) {
      setNameUser(user.nameUser || user.email || "Usuário");
    }
  }, [user]);

  // Fechar o sidebar ao pressionar o botão voltar no Android
  useEffect(() => {
    if (Platform.OS !== 'web') {
      const backAction = () => {
        if (isOpen) {
          setIsOpen(false);
          return true;
        }
        return false;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );

      return () => backHandler.remove();
    }
  }, [isOpen]);

  useEffect(() => {
    // Animação de entrada e saída
    if (isOpen) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [isOpen]);

  const slideInterpolate = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-sidebarWidth, 0]
  });

  const fadeInterpolate = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5]
  });

  const Renderitems = useMemo(() => {
    if (!data || data.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum item disponível</Text>
        </View>
      );
    }

    return data.map((item, index) => (
      <TouchableOpacity
        key={item.id || index}
        style={styles.menuItem}
        onPress={() => {
          setIsOpen(false);
          setTimeout(() => {
            if (item.route) {
              router.push(item.route);
            }
          }, 300);
        }}
        activeOpacity={0.7}
      >
        <View style={styles.menuItemContent}>
          {item.icon && (
            <View style={styles.menuIcon}>
              {item.icon}
            </View>
          )}
          <Text style={styles.menuText}>{item.label}</Text>
        </View>
        <ChevronRight size={18} color="rgba(255,255,255,0.6)" />
      </TouchableOpacity>
    ));
  }, [data]);

  const handleLogout = () => {
    setIsOpen(false);
    setTimeout(() => {
      signOut();
    }, 300);
  };

  return (
    <>
      {isOpen && (
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
          <Animated.View 
            style={[
              styles.overlay, 
              { opacity: fadeInterpolate }
            ]} 
          />
        </TouchableWithoutFeedback>
      )}
      
      <Animated.View
        style={[
          styles.sidebar, 
          { 
            transform: [{ translateX: slideInterpolate }],
            width: sidebarWidth,
            shadowOpacity: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.2]
            })
          }
        ]}
      >
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.menuTitle}>Menu</Text>
            <ButtonIcons
              color="white"
              size={28}
              handleChange={() => setIsOpen(false)}
              Icon={({ color, size }) => <X color={color} size={size} />}
              style={styles.closeButton}
            />
          </View>

          <View style={styles.profileContainer}>
            <View style={styles.imageContainer}>
              {user?.photoURL ? (
                <Image
                  source={{ uri: user.photoURL }}
                  style={styles.profileImage}
                />
              ) : (
                <View style={styles.profilePlaceholder}>
                  <User size={24} color="#003B73" />
                </View>
              )}
            </View>
            <Text style={styles.profileName} numberOfLines={1}>
              {nameUser}
            </Text>
            <Text style={styles.profileEmail} numberOfLines={1}>
              {user?.email || "Bem-vindo"}
            </Text>
          </View>
        </View>

        <ScrollView 
          style={styles.menuContainer}
          showsVerticalScrollIndicator={false}
        >
          {Renderitems}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <LogOut size={18} color="#fff" />
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
          <Text style={styles.versionText}>v1.0.0</Text>
        </View>
      </Animated.View>
    </>
  );
});

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    zIndex: 14,
  },
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    backgroundColor: "#60A3D9",
    zIndex: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    backgroundColor: "#003B73",
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
  closeButton: {
    padding: 4,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  profileContainer: {
    alignItems: "center",
  },
  imageContainer: {
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "white",
  },
  profilePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: "white",
  },
  profileName: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
    textAlign: 'center',
  },
  profileEmail: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
    textAlign: 'center',
  },
  menuContainer: {
    flex: 1,
    paddingVertical: 8,
  },
  menuItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    marginRight: 12,
    opacity: 0.8,
  },
  menuText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    fontStyle: 'italic',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
    backgroundColor: 'rgba(0,59,115,0.3)',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 8,
    marginBottom: 12,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  versionText: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 12,
    textAlign: 'center',
  },
});