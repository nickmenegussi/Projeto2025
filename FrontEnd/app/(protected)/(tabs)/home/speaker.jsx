import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ArrowLeftIcon, MailIcon, GlobeIcon } from "lucide-react-native";
import { router } from "expo-router";
import Trending from "../../../../components/Navagation";

const Speaker = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <ImageBackground
        style={styles.background}
        source={require("../../../../assets/images/Jesus-Cristo.png")}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back("/home/lectures")}
          >
            <ArrowLeftIcon color="white" size={24} />
          </TouchableOpacity>
          <View style={styles.overlay}>
            <Text style={styles.title}>Palestrante</Text>
          </View>
        </View>
      </ImageBackground>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.name}>Milton Santos</Text>
          <Text style={styles.role}>Geógrafo, Professor e Pesquisador</Text>

          <Text style={styles.description}>
            Considerado um dos maiores geógrafos brasileiros e referência 
            mundial em geografia humana. Doutor pela Universidade de Strasbourg, 
            foi professor em diversas universidades prestigiadas e desenvolveu 
            teorias fundamentais sobre globalização, espaço geográfico e 
            desenvolvimento.
          </Text>

          <View style={styles.divider} />

          {/* Formação Acadêmica */}
          <Text style={styles.sectionTitle}>Formação Acadêmica</Text>
          <View style={styles.tags}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Doutor em Geografia - Universidade de Strasbourg</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Professor Titular - Universidade de São Paulo</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Pós-Doutorado - Sorbonne</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Principais Contribuições */}
          <Text style={styles.sectionTitle}>Principais Contribuições</Text>
          <View style={styles.tags}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Teoria da Globalização Perversa</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Conceito de Espaço Geográfico</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Geografia Humana Crítica</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Técnica, Espaço e Tempo</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Periodização da Globalização</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Áreas de Atuação */}
          <Text style={styles.sectionTitle}>Áreas de Atuação</Text>
          <View style={styles.tags}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Geografia Urbana</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Globalização e Desenvolvimento</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Epistemologia da Geografia</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Políticas Públicas</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Planejamento Territorial</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Prêmios e Reconhecimentos */}
          <Text style={styles.sectionTitle}>Prêmios e Reconhecimentos</Text>
          <View style={styles.tags}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Prêmio Internacional de Geografia Vautrin Lud (1994)</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Prêmio Anpuh de História</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Professor Emérito - USP</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Obras Principais */}
          <Text style={styles.sectionTitle}>Obras Principais</Text>
          <View style={styles.tags}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>"Por Uma Outra Globalização"</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>"O Espaço do Cidadão"</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>"Técnica, Espaço, Tempo"</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>"A Natureza do Espaço"</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>"Metrópole Corporativa Fragmentada"</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Citações Inspiradoras */}
          <Text style={styles.sectionTitle}>Pensamentos Inspiradores</Text>
          <View style={styles.quoteContainer}>
            <Text style={styles.quote}>
              "A geografia serve antes de tudo para fazer o mundo melhor entender."
            </Text>
          </View>
          <View style={styles.quoteContainer}>
            <Text style={styles.quote}>
              "O espaço é o conjunto indissociável de sistemas de objetos e sistemas de ações."
            </Text>
          </View>
          <View style={styles.quoteContainer}>
            <Text style={styles.quote}>
              "A globalização perversa produz alhures uma regressão social espetacular."
            </Text>
          </View>
        </View>

        {/* Redes Sociais e Contato */}
        <View style={styles.socialSection}>
          <Text style={styles.socialTitle}>Legado e Influência</Text>
          <Text style={styles.socialDescription}>
            Milton Santos deixou um legado fundamental para o pensamento 
            geográfico contemporâneo. Suas obras continuam influenciando 
            pesquisadores e estudantes em todo o mundo.
          </Text>
          
          <View style={styles.socialIcons}>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="graduation-cap" size={20} color="#003B73" />
              <Text style={styles.socialButtonText}>Acadêmico</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="book" size={20} color="#003B73" />
              <Text style={styles.socialButtonText}>Obras</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <GlobeIcon size={20} color="#003B73" />
              <Text style={styles.socialButtonText}>Legado</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.spacer} />
      </ScrollView>

      {/* Navegação */}
      <View style={styles.navigationContainer}>
        <Text style={styles.navigationTitle}>Navegação de Páginas</Text>
        <Trending
          navagations={[
            { name: "Palestrante", path: "/home/speaker" },
            { name: "Propósito", path: "/home/lecturesObjective" },
            { name: "Público alvo", path: "/home/targetPublicLectures" },
          ]}
          textTitlle={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003B73",
  },
  background: {
    height: 200,
  },
  header: {
    flex: 1,
    backgroundColor: "rgba(0, 59, 115, 0.8)",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
    padding: 8,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  content: {
    flex: 1,
    marginTop: 10,
  },
  card: {
    backgroundColor: "white",
    margin: 16,
    padding: 24,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#003B73",
    marginBottom: 4,
    textAlign: "center",
  },
  role: {
    fontSize: 16,
    color: "#60A3D9",
    marginBottom: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
    marginBottom: 20,
    textAlign: "justify",
  },
  divider: {
    height: 1,
    backgroundColor: "#E9ECEF",
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#003B73",
    marginBottom: 12,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    backgroundColor: "#F0F7FF",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#60A3D9",
    marginBottom: 6,
  },
  tagText: {
    color: "#003B73",
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
  },
  quoteContainer: {
    backgroundColor: "#F8F9FA",
    borderLeftWidth: 4,
    borderLeftColor: "#60A3D9",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  quote: {
    fontSize: 15,
    fontStyle: "italic",
    color: "#003B73",
    lineHeight: 22,
    textAlign: "left",
  },
  socialSection: {
    backgroundColor: "white",
    margin: 16,
    padding: 24,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  socialTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#003B73",
    textAlign: "center",
    marginBottom: 12,
  },
  socialDescription: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 20,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  socialButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#F0F7FF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E9ECEF",
    maxWidth: 100,
  },
  socialButtonText: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "600",
    color: "#003B73",
  },
  spacer: {
    height: 20,
  },
  navigationContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 140,
    backgroundColor: "#003B73",
  },
  navigationTitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginBottom: 12,
  },
});

export default Speaker;