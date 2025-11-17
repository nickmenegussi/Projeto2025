import {
  ArrowLeftIcon,
  BugIcon,
  LogOutIcon,
  UserPlusIcon,
  User2Icon,
  ShieldIcon,
  BellIcon,
  HelpCircleIcon,
  PaletteIcon,
  MailIcon,
  LockIcon,
  BookIcon,
  ClockIcon,
  HeartIcon,
  StarIcon,
  FileTextIcon,
  LanguagesIcon,
} from "lucide-react-native";

// import styles from "./styles/SettingsStyle"
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  ScrollView,
  Linking,
  Image,
} from "react-native";
import { router } from "expo-router";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../context/auth";
import Constants from 'expo-constants';

const HomeSettings = () => {
  const { logout, user } = useContext(AuthContext);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [loanReminders, setLoanReminders] = useState(true);
  const [personalizedSuggestions, setPersonalizedSuggestions] = useState(true);
  const {enderecoUrlImage} = Constants.expoConfig.extra 

  const sections = [
    {
      title: "Conta",
      data: [
        {
          id: 1,
          title: "Editar Perfil",
          icon: User2Icon,
          path: "/settings/editProfile",
          description: "Gerencie suas informações pessoais",
        },
        {
          id: 2,
          title: "Privacidade e Segurança",
          icon: ShieldIcon,
          path: "/settings/privacy",
          description: "Controle sua privacidade",
        },
        {
          id: 3,
          title: "Alterar Email",
          icon: MailIcon,
          path: "/settings/changeEmail",
          description: "Atualize seu endereço de email",
        },
        {
          id: 4,
          title: "Alterar Senha",
          icon: LockIcon,
          path: "/settings/changePassword",
          description: "Atualize sua senha de acesso",
        },
      ],
    },
    {
      title: "Preferências de Biblioteca",
      data: [
        {
          id: 5,
          title: "Lembretes de Devolução",
          icon: ClockIcon,
          type: "toggle",
          value: loanReminders,
          onValueChange: setLoanReminders,
          description: "Alertas para devolver livros",
        },
        {
          id: 6,
          title: "Sugestões Personalizadas",
          icon: HeartIcon,
          type: "toggle",
          value: personalizedSuggestions,
          onValueChange: setPersonalizedSuggestions,
          description: "Recomendações baseadas no seu gosto",
        },
        {
          id: 7,
          title: "Idioma",
          icon: LanguagesIcon,
          path: "/settings/language",
          description: "Altere o idioma do aplicativo",
        },
      ],
    },
    {
      title: "Notificações",
      data: [
        {
          id: 8,
          title: "Notificações",
          icon: BellIcon,
          path: "/settings/notification",

          type: "toggle",
          value: notificationsEnabled,
          onValueChange: setNotificationsEnabled,
          description: "Gerencie suas notificações",
        },
        {
          id: 9,
          title: "Aparência",
          icon: PaletteIcon,
          path: "/settings/appearance",
          description: "Tema claro ou escuro",
        },
      ],
    },
    {
      title: "Ajuda & Suporte",
      data: [
        {
          id: 10,
          title: "Reportar um problema",
          icon: BugIcon,
          path: "/settings/reportAProblem",
          description: "Encontrou um problema? Nos avise",
        },
        {
          id: 11,
          title: "Ajuda e FAQ",
          icon: HelpCircleIcon,
          action: () => Linking.openURL("https://ajuda.seusite.com"),
          description: "Perguntas frequentes e ajuda",
        },
        {
          id: 12,
          title: "Avaliar App",
          icon: StarIcon,
          action: () => {
            // Abrir loja de aplicativos para avaliação
            Linking.openURL("market://details?id=com.suaapp.biblioteca");
          },
          description: "Deixe sua avaliação na loja",
        },
        {
          id: 13,
          title: "Termos de Uso",
          icon: FileTextIcon,
          action: () => Linking.openURL("https://seusite.com/termos"),
          description: "Termos e condições do aplicativo",
        },
      ],
    },
    {
      title: "Conta",
      data: [
        {
          id: 14,
          title: "Adicionar conta",
          icon: UserPlusIcon,
          path: "/settings/addAccount",
          description: "Gerencie múltiplas contas",
        },
        {
          id: 15,
          title: "Sair da conta",
          icon: LogOutIcon,
          action: logout,
          description: `Conectado como ${user?.nameUser || "Usuário"}`,
          isDestructive: true,
        },
      ],
    },
  ];

  const handleItemPress = (item) => {
    if (item.action) {
      item.action();
    } else if (item.path) {
      router.push(item.path);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.returnButton}
          onPress={() => router.back()}
        >
          <ArrowLeftIcon size={26} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configurações</Text>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.userInfo}>
          <Image
            style={styles.avatar}
            source={{
                      uri: user?.image_profile
                        ? `${enderecoUrlImage}/uploads/${user.image_profile}`
                        : require("../../../../assets/images/default-profile.jpg"),
                    }}
          />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{user?.nameUser || "Usuário"}</Text>
            <Text style={styles.userEmail}>
              {user?.email || "usuario@email.com"}
            </Text>
            <Text style={styles.memberSince}>Membro desde Jan 2023</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Livros lidos</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Em empréstimo</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Favoritos</Text>
          </View>
        </View>

        {sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionBox}>
              {section.data.map((item) => {
                const Icon = item.icon;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.itemContainer,
                      item.isDestructive && styles.destructiveItem,
                    ]}
                    onPress={() => handleItemPress(item)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.itemContent}>
                      <Icon
                        size={22}
                        color={item.isDestructive ? "#FF453A" : "#fff"}
                        style={{ marginRight: 12 }}
                      />
                      <View style={styles.itemTextContainer}>
                        <Text
                          style={[
                            styles.itemText,
                            item.isDestructive && styles.destructiveText,
                          ]}
                        >
                          {item.title}
                        </Text>
                        {item.description && (
                          <Text style={styles.itemDescription}>
                            {item.description}
                          </Text>
                        )}
                      </View>
                    </View>

                    {item.type === "toggle" ? (
                      <Switch
                        value={item.value}
                        onValueChange={item.onValueChange}
                        trackColor={{ false: "#767577", true: "#60A3D9" }}
                        thumbColor={item.value ? "#f4f3f4" : "#f4f3f4"}
                      />
                    ) : (
                      <View style={styles.chevron} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={styles.versionText}>Versão 1.0.0</Text>
          <Text style={styles.copyrightText}>
            © {new Date().getFullYear()} CEO - Centro Espírita Online
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(HomeSettings);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#003B73",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff22",
    position: "relative",
  },
  returnButton: {
    position: "absolute",
    left: 20,
    backgroundColor: "#60A3D9",
    borderRadius: 10,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.5)",
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
  },
  statDivider: {
    width: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginBottom: 12,
    marginLeft: 8,
  },
  sectionBox: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 12,
    overflow: "hidden",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  destructiveItem: {
    backgroundColor: "rgba(255, 69, 58, 0.1)",
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  destructiveText: {
    color: "#FF453A",
  },
  itemDescription: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 13,
  },
  chevron: {
    width: 8,
    height: 8,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.5)",
    transform: [{ rotate: "45deg" }],
  },
  footer: {
    alignItems: "center",
    marginTop: 16,
    marginBottom: 32,
  },
  versionText: {
    textAlign: "center",
    fontFamily: "bold",
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 12,
    marginBottom: 4,
  },
  copyrightText: {
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 11,
    fontFamily: "bold",
  },
});
