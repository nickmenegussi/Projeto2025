import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  useWindowDimensions,
  Platform,
} from "react-native";
import {
  Library,
  GraduationCap,
  Home,
  Map,
  MessageSquare,
  Settings,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react-native";
import { useRouter, usePathname } from "expo-router";
import { AuthContext } from "../context/auth";

const SidebarWeb = () => {
  const { user, signOut } = useContext(AuthContext);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  // Navigation items
  const navItems = [
    { id: 1, label: "Home", icon: Home, path: "/home" },
    { id: 2, label: "Biblioteca", icon: Library, path: "/library" },
    { id: 3, label: "Casas", icon: Map, path: "/localization" },
    { id: 4, label: "Estudos", icon: GraduationCap, path: "/studyGroup" },
    { id: 5, label: "Fórum", icon: MessageSquare, path: "/community" },
    { id: 6, label: "Perfil", icon: Settings, path: "/settings" },
  ];

  const handleLogout = () => {
    signOut();
  };

  const navigateTo = (path) => {
    setIsOpen(false);
    router.push(path);
  };

  // For web with fixed sidebar
  return (
    <>
      {/* Navbar */}
      <View style={styles.navbar}>
        <View style={styles.navbarContainer}>
          <View style={styles.navbarLeft}>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => setIsOpen(!isOpen)}
            >
              <Menu size={20} color="#9CA3AF" />
            </TouchableOpacity>
            <View style={styles.logoContainer}>
              <Image
                source={{ uri: "https://flowbite.com/docs/images/logo.svg" }}
                style={styles.logo}
              />
              <Text style={styles.logoText}>Flowbite</Text>
            </View>
          </View>

          <View style={styles.navbarRight}>
            <View style={styles.userMenu}>
              <TouchableOpacity
                style={styles.userButton}
                onPress={() => setUserDropdownOpen(!userDropdownOpen)}
              >
                <Image
                  source={{
                    uri: user?.photoURL || "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
                  }}
                  style={styles.userAvatar}
                />
              </TouchableOpacity>

              {userDropdownOpen && (
                <View style={styles.userDropdown}>
                  <View style={styles.dropdownHeader}>
                    <Text style={styles.dropdownName}>{user?.name || user?.email || "Usuário"}</Text>
                    <Text style={styles.dropdownEmail}>
                      {user?.email || "Bem-vindo"}
                    </Text>
                  </View>
                  <View style={styles.dropdownDivider} />
                  <TouchableOpacity style={styles.dropdownItem} onPress={() => navigateTo("/dashboard")}>
                    <Text style={styles.dropdownItemText}>Dashboard</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.dropdownItem} onPress={() => navigateTo("/settings")}>
                    <Text style={styles.dropdownItemText}>Settings</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.dropdownItem}>
                    <Text style={styles.dropdownItemText}>Earnings</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={handleLogout}
                  >
                    <Text style={styles.dropdownItemText}>Sign out</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>

      {/* Sidebar Overlay for Mobile */}
      {isOpen && isMobile && (
        <TouchableOpacity 
          style={styles.overlay} 
          onPress={() => setIsOpen(false)}
          activeOpacity={1}
        />
      )}

      {/* Sidebar */}
      <View style={[
        styles.sidebar, 
        isMobile ? { 
          transform: [{ translateX: isOpen ? 0 : -280 }],
          position: 'absolute',
          zIndex: 40,
        } : {
          position: 'fixed',
        }
      ]}>
        <View style={styles.sidebarHeader}>
          <Text style={styles.sidebarTitle}>Navegação</Text>
          {isMobile && (
            <TouchableOpacity onPress={() => setIsOpen(false)}>
              <X size={20} color="#D1D5DB" />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView style={styles.sidebarContent}               showsHorizontalScrollIndicator={false}
>
          {user && (
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
                {user.name || user.email || "Usuário"}
              </Text>
              <Text style={styles.profileEmail} numberOfLines={1}>
                {user.email || "Bem-vindo"}
              </Text>
            </View>
          )}

          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = pathname === item.path;

            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.sidebarItem,
                  isActive && styles.sidebarItemActive,
                ]}
                onPress={() => navigateTo(item.path)}
              >
                <IconComponent
                  color={isActive ? "#60A3D9" : "#D1D5DB"}
                  size={20}
                />
                <Text
                  style={[
                    styles.sidebarText,
                    isActive && styles.sidebarTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}

          {user && (
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <LogOut size={20} color="#D1D5DB" />
              <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>

     
    </>
  );
};

const styles = StyleSheet.create({
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: '#1F2937',
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
    zIndex: 50,
    paddingHorizontal: 16,
  },
  navbarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navbarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    padding: 8,
    marginRight: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  logoText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  navbarRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userMenu: {
    position: 'relative',
  },
  userButton: {
    borderRadius: 9999,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  userDropdown: {
    position: 'absolute',
    top: 48,
    right: 0,
    width: 220,
    backgroundColor: 'white',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 60,
  },
  dropdownHeader: {
    padding: 12,
  },
  dropdownName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  dropdownEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  dropdownDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  dropdownItem: {
    padding: 12,
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#374151',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 39,
  },
  sidebar: {
    top: 64,
    left: 0,
    bottom: 0,
    width: 280,
    backgroundColor: '#1F2937',
    borderRightWidth: 1,
    borderRightColor: '#374151',
  },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  sidebarTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  sidebarContent: {
    flex: 1,
    padding: 16,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 24,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
  },
  imageContainer: {
    marginBottom: 12,
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
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  profileName: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
    textAlign: "center",
  },
  profileEmail: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 13,
    textAlign: "center",
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 4,
    borderRadius: 6,
  },
  sidebarItemActive: {
    backgroundColor: 'rgba(96, 163, 217, 0.2)',
  },
  sidebarText: {
    color: "#D1D5DB",
    marginLeft: 12,
    fontSize: 14,
    fontWeight: "500",
  },
  sidebarTextActive: {
    color: "#60A3D9",
    fontWeight: "600",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 6,
    marginTop: 16,
  },
  logoutText: {
    color: "#D1D5DB",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },
  mainContent: {
    marginTop: 64,
    flex: 1,
    backgroundColor: '#F9FAFB',
    minHeight: '100vh',
  },
  contentContainer: {
    padding: 16,
  },
});

export default SidebarWeb;