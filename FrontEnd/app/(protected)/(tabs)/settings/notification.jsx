import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Switch,
  Alert,
  Platform,
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useNotification } from "../../../../context/NotificationContext";
import { AuthContext } from "../../../../context/auth";
import { Ionicons } from "@expo/vector-icons";
import api from "../../../../services/api";

const API_URL = "http://192.168.1.21:3001/notifications";

export default function NotificationsScreen() {
  const { notification, expoPushToken, error } = useNotification();
  const { user, token } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [settings, setSettings] = useState({
    pushEnabled: true,
    marketing: true,
    reminders: true,
    security: true,
    sound: true,
    vibration: true,
  });
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tokenSent, setTokenSent] = useState(false);

  const fetchNotifications = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/notifications`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        const formattedNotifications = result.data.map((notif) => ({
          id: notif.idNotifications,
          title: extractTitle(notif.message),
          body: notif.message,
          time: formatTime(notif.created_at),
          read: notif.isRead,
          type: getNotificationType(notif.message),
          icon: getNotificationIcon(notif.message),
        }));

        setNotifications(formattedNotifications);
      } else {
        Alert.alert("Erro", result.message);
      }
    } catch (error) {
      Alert.alert(
        "Erro de Conexão",
        `Não foi possível conectar com o servidor.\n\nVerifique:\n1. Se o backend está rodando\n2. Se a URL está correta\n3. Sua conexão com a rede\n\nErro: ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  // 🔥 MARCAR TODAS COMO LIDAS
  const markAllAsRead = async () => {
    try {
      const response = await fetch(`${API_URL}/notifications/read-all`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (result.success) {
        setNotifications((prev) =>
          prev.map((notif) => ({ ...notif, read: true }))
        );
        Alert.alert("Sucesso", result.message);
      } else {
        Alert.alert("Erro", result.message);
      }
    } catch (error) {
      console.error("Erro ao marcar como lidas:", error);
      Alert.alert("Erro", "Não foi possível marcar como lidas");
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const response = await fetch(
        `${API_URL}/notifications/${notificationId}/read`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (result.success) {
        setNotifications((prev) =>
          prev.map((notif) =>
            notif.id === notificationId ? { ...notif, read: true } : notif
          )
        );
      }
    } catch (error) {
      console.error("Erro ao marcar notificação como lida:", error);
    }
  };

  const sendTokenToBackend = async () => {
    if (!expoPushToken || !token) return;

    try {
      const response = await api.post(
        `${API_URL}/notifications`,
        {
          message: "Dispositivo registrado para notificações push",
          expoPushToken: expoPushToken,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.success) {
        setTokenSent(true);
      }
    } catch (error) {
      console.error("Erro ao enviar token:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchNotifications();
    } else {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (expoPushToken && token && !tokenSent) {
      sendTokenToBackend();
    }
  }, [expoPushToken, token, tokenSent]);

  useEffect(() => {
    if (notification) {
      const newNotification = {
        id: Date.now(),
        title: notification.request.content.title || "Nova Notificação",
        body:
          notification.request.content.body || "Você tem uma nova notificação",
        time: "Agora mesmo",
        read: false,
        type: "system",
        icon: "notifications",
        data: notification.request.content.data,
      };
      setNotifications((prev) => [newNotification, ...prev]);
    }
  }, [notification]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchNotifications();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const toggleSetting = (key) => {
    const newSettings = {
      ...settings,
      [key]: !settings[key],
    };
    setSettings(newSettings);
  };

  const clearAllNotifications = () => {
    Alert.alert(
      "Limpar Notificações",
      "Tem certeza que deseja limpar todas as notificações?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Limpar",
          style: "destructive",
          onPress: () => setNotifications([]),
        },
      ]
    );
  };

  const testNotification = async () => {
    if (!expoPushToken || !token) {
      Alert.alert("Aviso", "Token não disponível");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/notifications`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "🔔 Esta é uma notificação de teste do app!",
          expoPushToken: expoPushToken,
        }),
      });

      const result = await response.json();

      if (result.success) {
        Alert.alert("Sucesso", "Notificação de teste criada!");
        fetchNotifications();
      }
    } catch (error) {
      Alert.alert("Erro", "Falha ao enviar notificação de teste");
    }
  };

  const extractTitle = (message) => {
    if (message.includes(":")) return message.split(":")[0];
    if (message.length > 30) return message.substring(0, 30) + "...";
    return message;
  };

  const formatTime = (dateString) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) return "Agora mesmo";
      if (diffMins < 60) return `${diffMins} min atrás`;
      if (diffHours < 24) return `${diffHours} h atrás`;
      return `${diffDays} dias atrás`;
    } catch {
      return "Data desconhecida";
    }
  };

  const getNotificationType = (message) => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes("promoção") || lowerMessage.includes("oferta"))
      return "marketing";
    if (
      lowerMessage.includes("lembrete") ||
      lowerMessage.includes("importante")
    )
      return "reminder";
    if (lowerMessage.includes("segurança") || lowerMessage.includes("alerta"))
      return "security";
    return "system";
  };

  const getNotificationIcon = (message) => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes("promoção") || lowerMessage.includes("oferta"))
      return "pricetag";
    if (lowerMessage.includes("lembrete")) return "time";
    if (lowerMessage.includes("segurança")) return "shield-checkmark";
    if (lowerMessage.includes("bem-vindo")) return "checkmark-circle";
    return "notifications";
  };

  const getUnreadCount = () => {
    return notifications.filter((notif) => !notif.read).length;
  };

  const getIconColor = (type) => {
    const colors = {
      system: "#007AFF",
      marketing: "#34C759",
      reminder: "#FF9500",
      security: "#FF3B30",
    };
    return colors[type] || "#8E8E93";
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Carregando notificações...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Ionicons name="alert-circle" size={48} color="#FF3B30" />
        <Text style={styles.errorText}>Erro ao carregar notificações</Text>
        <Text style={styles.errorSubtext}>{error.message}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={fetchNotifications}
        >
          <Text style={styles.retryButtonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* CABEÇALHO */}
        <View style={styles.header}>
          <Text style={styles.title}>Notificações</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity
              onPress={markAllAsRead}
              style={styles.headerButton}
            >
              <Ionicons name="checkmark-done" size={20} color="#007AFF" />
              <Text style={styles.headerButtonText}>Ler todas</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={clearAllNotifications}
              style={styles.headerButton}
            >
              <Ionicons name="trash" size={20} color="#FF3B30" />
              <Text style={styles.headerButtonText}>Limpar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* CONTADOR */}
        {getUnreadCount() > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>
              {getUnreadCount()}{" "}
              {getUnreadCount() === 1 ? "não lida" : "não lidas"}
            </Text>
          </View>
        )}

        {/* BOTÃO TESTE */}
        <TouchableOpacity style={styles.testButton} onPress={testNotification}>
          <Ionicons name="notifications" size={20} color="#FFF" />
          <Text style={styles.testButtonText}>Testar Notificação</Text>
        </TouchableOpacity>

        {/* LISTA DE NOTIFICAÇÕES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Histórico</Text>
          {notifications.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="notifications-off" size={48} color="#C7C7CC" />
              <Text style={styles.emptyStateText}>Nenhuma notificação</Text>
              <Text style={styles.emptyStateSubtext}>
                Novas notificações aparecerão aqui
              </Text>
            </View>
          ) : (
            notifications.map((notif) => (
              <TouchableOpacity
                key={notif.id}
                style={[
                  styles.notificationItem,
                  !notif.read && styles.unreadNotification,
                ]}
                onPress={() => !notif.read && markAsRead(notif.id)}
              >
                <View style={styles.notificationIcon}>
                  <Ionicons
                    name={notif.icon}
                    size={20}
                    color={getIconColor(notif.type)}
                  />
                </View>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>{notif.title}</Text>
                  <Text style={styles.notificationBody}>{notif.body}</Text>
                  <Text style={styles.notificationTime}>{notif.time}</Text>
                </View>
                {!notif.read && <View style={styles.unreadDot} />}
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* CONFIGURAÇÕES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configurações</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="notifications" size={20} color="#007AFF" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Notificações Push</Text>
                <Text style={styles.settingDescription}>
                  {settings.pushEnabled ? "Ativado" : "Desativado"}
                  {tokenSent && " ✅ Conectado"}
                </Text>
              </View>
            </View>
            <Switch
              value={settings.pushEnabled}
              onValueChange={() => toggleSetting("pushEnabled")}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="megaphone" size={20} color="#34C759" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Promoções e Ofertas</Text>
                <Text style={styles.settingDescription}>
                  Notificações de marketing
                </Text>
              </View>
            </View>
            <Switch
              value={settings.marketing}
              onValueChange={() => toggleSetting("marketing")}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="time" size={20} color="#FF9500" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Lembretes</Text>
                <Text style={styles.settingDescription}>
                  Notificações de lembrete
                </Text>
              </View>
            </View>
            <Switch
              value={settings.reminders}
              onValueChange={() => toggleSetting("reminders")}
            />
          </View>
        </View>

        {/* INFORMAÇÕES DO DISPOSITIVO */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Status:</Text>
            <Text style={styles.infoValue}>
              {settings.pushEnabled ? "✅ Ativas" : "❌ Desativadas"}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Total:</Text>
            <Text style={styles.infoValue}>
              {notifications.length} notificações
            </Text>
          </View>
          {expoPushToken && (
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Token:</Text>
              <Text style={styles.infoValue} numberOfLines={1}>
                {expoPushToken.substring(0, 20)}...
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#f2f2f7",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5ea",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  headerActions: {
    flexDirection: "row",
    gap: 16,
  },
  headerButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    padding: 8,
  },
  headerButtonText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
  },
  unreadBadge: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: "flex-start",
    margin: 16,
  },
  unreadText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  testButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#007AFF",
    margin: 16,
    padding: 12,
    borderRadius: 8,
  },
  testButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  section: {
    backgroundColor: "#fff",
    marginTop: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#000",
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f7",
  },
  unreadNotification: {
    backgroundColor: "#f8f9ff",
  },
  notificationIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f2f2f7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 2,
  },
  notificationBody: {
    fontSize: 14,
    color: "#8E8E93",
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: "#C7C7CC",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#007AFF",
    marginLeft: 8,
    marginTop: 4,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#8E8E93",
    marginTop: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#C7C7CC",
    marginTop: 4,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f7",
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingText: {
    marginLeft: 12,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
  settingDescription: {
    fontSize: 14,
    color: "#8E8E93",
    marginTop: 2,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: "#8E8E93",
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 14,
    color: "#000",
    flex: 1,
    textAlign: "right",
    marginLeft: 8,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#8E8E93",
  },
  errorText: {
    fontSize: 18,
    color: "#FF3B30",
    fontWeight: "600",
    marginTop: 12,
  },
  errorSubtext: {
    fontSize: 14,
    color: "#8E8E93",
    marginTop: 4,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 16,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
