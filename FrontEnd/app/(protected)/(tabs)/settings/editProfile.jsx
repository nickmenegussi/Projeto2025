import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Alert,
  Platform
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeftIcon,
  CameraIcon,
  LinkIcon,
  Pen,
  PlusIcon,
  UserIcon,
} from "lucide-react-native";
import { router } from "expo-router";

const EditProfile = () => {
  const [profileData, setProfileData] = useState({
    username: "yMOS4.1",
    description: "Descripto do perfil",
    email: "yarchvlg@gradacion",
    website: "www.example.com"
  });

  const handleChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Lógica para salvar as alterações
    Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
  };

  const handleChangePhoto = () => {
    // Lógica para alterar foto
    Alert.alert("Alterar Foto", "Escolha uma opção", [
      { text: "Câmera", onPress: () => console.log("Abrir câmera") },
      { text: "Galeria", onPress: () => console.log("Abrir galeria") },
      { text: "Cancelar", style: "cancel" }
    ]);
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
        <Text style={styles.headerTitle}>Editar Perfil</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.userSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={require("../../../../assets/images/default-profile.jpg")}
              style={styles.avatar}
            />
            <TouchableOpacity 
              style={styles.editIcon}
              onPress={handleChangePhoto}
            >
              <CameraIcon size={16} color={"white"} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleChangePhoto}>
            <Text style={styles.changePhotoText}>Mudar Foto do perfil</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.formSection}>
          <View style={styles.inputContainer}>
            <UserIcon size={20} color="#60A3D9" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Nome de usuário"
              placeholderTextColor="#AAAAAA"
              value={profileData.username}
              onChangeText={(text) => handleChange('username', text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Pen size={20} color="#60A3D9" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Descrição do perfil"
              placeholderTextColor="#AAAAAA"
              value={profileData.description}
              onChangeText={(text) => handleChange('description', text)}
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#AAAAAA"
              value={profileData.email}
              onChangeText={(text) => handleChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <LinkIcon size={20} color="#60A3D9" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Website"
              placeholderTextColor="#AAAAAA"
              value={profileData.website}
              onChangeText={(text) => handleChange('website', text)}
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity style={styles.addNoteButton}>
            <PlusIcon size={20} color="#FFFFFF" />
            <Text style={styles.addNoteText}>Adicionar nota</Text>
          </TouchableOpacity>

          <View style={styles.updatesSection}>
            <Text style={styles.sectionTitle}>Atualizações</Text>
            <View style={styles.updateItem}>
              <Text style={styles.updateText}>Nenhuma atualização recente</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#003B73",
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#60A3D9",
    height: 120,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingHorizontal: 20,
  },
  returnButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "600",
  },
  userSection: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    marginBottom: 10,
    position: "relative",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#FFFFFF",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#0077B6",
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  changePhotoText: {
    color: "white", 
    fontSize: 14,
    marginTop: 8,
    textDecorationLine: "underline",
  },
  formSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: "white",
    fontSize: 16,
    paddingVertical: 15,
  },
  multilineInput: {
    textAlignVertical: 'top',
    paddingTop: 15,
    minHeight: 100,
  },
  addNoteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#60A3D9",
    padding: 16,
    borderRadius: 12,
    marginBottom: 25,
    gap: 8,
  },
  addNoteText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  updatesSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  updateItem: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  updateText: {
    color: "white",
    fontSize: 14,
    opacity: 0.8,
  },
});

export default EditProfile;