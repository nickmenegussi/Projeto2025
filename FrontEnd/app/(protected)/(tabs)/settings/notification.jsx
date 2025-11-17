import { useEffect, useState } from "react";
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
  RefreshControl
} from "react-native";
import { useNotification } from "../../../../context/NotificationContext";
import { Ionicons } from "@expo/vector-icons";

export default function NotificationsScreen() {
  const { notification, expoPushToken, error } = useNotification();
  const [notifications, setNotifications] = useState([]);
  const [settings, setSettings] = useState({
    pushEnabled: true,
    marketing: true,
    reminders: true,
    security: false,
    sound: true,
    vibration: true,
  });
  const [refreshing, setRefreshing] = useState(false);

  // Simular histórico de notificações
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        title: "Bem-vindo ao App!",
        body: "Sua conta foi criada com sucesso",
        time: "2 horas atrás",
        read: true,
        type: "system",
        icon: "checkmark-circle"
      },
      {
        id: 2,
        title: "Promoção Especial",
        body: "Desconto de 20% em todos os produtos",
        time: "1 dia atrás",
        read: true,
        type: "marketing",
        icon: "pricetag"
      },
      {
        id: 3,
        title: "Lembrete Importante",
        body: "Não se esqueça de completar seu perfil",
        time: "2 dias atrás",
        read: false,
        type: "reminder",
        icon: "time"
      },
      {
        id: 4,
        title: "Atividade Suspeita",
        body: "Novo login detectado na sua conta",
        time: "3 dias atrás",
        read: false,
        type: "security",
        icon: "shield-checkmark"
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  // Adicionar nova notificação recebida
  useEffect(() => {
    if (notification) {
      const newNotification = {
        id: Date.now(),
        title: notification.request.content.title,
        body: notification.request.content.body,
        time: "Agora mesmo",
        read: false,
        type: "system",
        icon: "notifications",
        data: notification.request.content.data
      };
      setNotifications(prev => [newNotification, ...prev]);
    }
  }, [notification]);

  const onRefresh = () => {
    setRefreshing(true);
    // Simular carregamento de novas notificações
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const clearAllNotifications = () => {
    Alert.alert(
      "Limpar Notificações",
      "Tem certeza que deseja limpar todas as notificações?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Limpar", style: "destructive", onPress: () => setNotifications([]) }
      ]
    );
  };

  const getUnreadCount = () => {
    return notifications.filter(notif => !notif.read).length;
  };

  const getIconColor = (type) => {
    const colors = {
      system: "#007AFF",
      marketing: "#34C759",
      reminder: "#FF9500",
      security: "#FF3B30"
    };
    return colors[type] || "#8E8E93";
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Erro ao carregar notificações: {error.message}</Text>
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
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.title}>Notificações</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={markAllAsRead} style={styles.headerButton}>
              <Ionicons name="checkmark-done" size={20} color="#007AFF" />
              <Text style={styles.headerButtonText}>Marcar lidas</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={clearAllNotifications} style={styles.headerButton}>
              <Ionicons name="trash" size={20} color="#FF3B30" />
              <Text style={styles.headerButtonText}>Limpar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Contador de não lidas */}
        {getUnreadCount() > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>
              {getUnreadCount()} {getUnreadCount() === 1 ? 'não lida' : 'não lidas'}
            </Text>
          </View>
        )}

        {/* Lista de Notificações */}
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
                  !notif.read && styles.unreadNotification
                ]}
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

        {/* Configurações */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configurações</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="notifications" size={20} color="#007AFF" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Notificações Push</Text>
                <Text style={styles.settingDescription}>
                  {settings.pushEnabled ? "Ativado" : "Desativado"}
                </Text>
              </View>
            </View>
            <Switch
              value={settings.pushEnabled}
              onValueChange={() => toggleSetting('pushEnabled')}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={settings.pushEnabled ? "#007AFF" : "#f4f3f4"}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="megaphone" size={20} color="#34C759" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Promoções e Ofertas</Text>
                <Text style={styles.settingDescription}>Notificações de marketing</Text>
              </View>
            </View>
            <Switch
              value={settings.marketing}
              onValueChange={() => toggleSetting('marketing')}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={settings.marketing ? "#34C759" : "#f4f3f4"}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="time" size={20} color="#FF9500" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Lembretes</Text>
                <Text style={styles.settingDescription}>Notificações de lembrete</Text>
              </View>
            </View>
            <Switch
              value={settings.reminders}
              onValueChange={() => toggleSetting('reminders')}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={settings.reminders ? "#FF9500" : "#f4f3f4"}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="shield-checkmark" size={20} color="#FF3B30" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Segurança</Text>
                <Text style={styles.settingDescription}>Alertas de segurança</Text>
              </View>
            </View>
            <Switch
              value={settings.security}
              onValueChange={() => toggleSetting('security')}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={settings.security ? "#FF3B30" : "#f4f3f4"}
            />
          </View>
        </View>

        {/* Informações do Dispositivo */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações do Dispositivo</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Push Token:</Text>
            <Text style={styles.infoValue} numberOfLines={1}>
              {expoPushToken || "Carregando..."}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Status:</Text>
            <Text style={styles.infoValue}>
              {settings.pushEnabled ? "✅ Notificações ativas" : "❌ Notificações desativadas"}
            </Text>
          </View>
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
    marginLeft: 16,
    marginTop: 8,
  },
  unreadText: {
    color: "#fff",
    fontSize: 12,
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
});