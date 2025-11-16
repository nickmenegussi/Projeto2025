import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router'; // Para navegação automática
import { useEffect } from 'react';

const { height } = Dimensions.get('window');

// Cores baseadas na imagem
const COR_TOPO = '#003B73'; // Azul escuro
const COR_BASE = '#3498DB'; // Azul claro

// 💡 Caminho para a sua imagem de logo
const LOGO_PATH = require('../assets/images/icon.png'); 

export default function Index() {
  const router = useRouter();
  
  // Lógica para Navegação Automática
  useEffect(() => {
    // 3 segundos antes de navegar para a próxima tela
    const AUTO_NAVIGATE_TIME = 3000; 

    const timer = setTimeout(() => {
      // Navega para a tela de login. Altere '/sign-in' se o nome for diferente
      router.replace('/ApresentationScreen'); 
    }, AUTO_NAVIGATE_TIME);
    
    // Limpeza
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <LinearGradient
      // Gradiente de cima para baixo
      colors={[COR_TOPO, COR_BASE]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.content}>
        <Image
          source={LOGO_PATH}
          style={styles.logo}
          resizeMode="contain"
          // Opcional: Adiciona um fallback se o caminho da imagem estiver incorreto
          onError={(e) => console.error("Erro ao carregar a imagem da logo:", e.nativeEvent.error)}
        />

        {/* Título */}
        <Text style={styles.title}>
          Centro Espírita Online
        </Text>

      </View>
      
      {/* Indicador de rodapé */}
      <View style={styles.footerIndicator} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: height * 0.05, 
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
    shadowColor: '#FFFFFF',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: 1,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  footerIndicator: {
    position: 'absolute',
    bottom: 20, 
    width: 130,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});