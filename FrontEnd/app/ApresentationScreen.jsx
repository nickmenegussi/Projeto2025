// app/index.tsx
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated, Image, Easing } from 'react-native';
// ⚠️ MODIFICAÇÃO: Importando useRouter
import { Link, useRouter } from 'expo-router'; 
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect, useCallback } from 'react';

const { width, height } = Dimensions.get('window');

// Cores Aprimoradas
const COR_FUNDO_ESCURO = '#002E5C';
const COR_PRIMARIA_CLARA = '#60A3D9';
const COR_DESTAQUE = '#B3E5FC';
const COR_OURO = '#89C2D9';

// Frases a serem exibidas
const PHRASES = [
  "Luz, Caridade e Esperança",
  "A fé raciocinada é a que resiste a todas as épocas.",
  "O futuro da humanidade está no Evangelho.",
  "Trabalhar, perdoar e amar.",
  "A caridade é o termômetro da fé.", 
  "Fora da caridade não há salvação"
];

// Componente para Ciclo de Frases com Efeito Typing Aprimorado
const AnimatedPhraseCycle = () => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const cursorAnim = useState(new Animated.Value(1))[0];

  // Animação do cursor piscando
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(cursorAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(cursorAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    const fullText = PHRASES[currentPhraseIndex];
    let timeoutId: NodeJS.Timeout;

    if (isTyping) {
      if (displayText.length < fullText.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(fullText.substring(0, displayText.length + 1));
        }, 50);
      } else {
        timeoutId = setTimeout(() => {
          setIsTyping(false);
        }, 2500);
      }
    } else {
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(fullText.substring(0, displayText.length - 1));
        }, 30);
      } else {
        timeoutId = setTimeout(() => {
          setCurrentPhraseIndex((prev) => (prev + 1) % PHRASES.length);
          setIsTyping(true);
        }, 500);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, isTyping, currentPhraseIndex]);

  return (
    <View style={styles.phraseContainer}>
      <Text style={styles.phraseText}>
        {displayText}
        <Animated.Text 
          style={[
            styles.cursor,
            { opacity: cursorAnim }
          ]}
        >
          |
        </Animated.Text>
      </Text>
      <View style={styles.phraseIndicator}>
        {PHRASES.map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.phraseDot,
              index === currentPhraseIndex && styles.phraseDotActive
            ]} 
          />
        ))}
      </View>
    </View>
  );
};

// Componente de Flocos de Luz
const FloatingParticles = () => {
  const particles = Array.from({ length: 8 }, (_, i) => {
    const anim = new Animated.Value(0);
    
    useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 3000 + Math.random() * 4000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 3000 + Math.random() * 4000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, []);

    return {
      anim,
      style: {
        left: Math.random() * width,
        top: Math.random() * height * 0.6,
        size: 2 + Math.random() * 4,
      }
    };
  });

  return (
    <>
      {particles.map((particle, index) => (
        <Animated.View
          key={index}
          style={[
            styles.floatingParticle,
            {
              width: particle.style.size,
              height: particle.style.size,
              left: particle.style.left,
              top: particle.style.top,
              opacity: particle.anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.2, 0.8]
              }),
              transform: [
                {
                  translateY: particle.anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -30]
                  })
                },
                {
                  scale: particle.anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1.2]
                  })
                }
              ]
            }
          ]}
        />
      ))}
    </>
  );
};

export default function Index() {
  const router = useRouter(); // ⬅️ MODIFICAÇÃO: Inicializa o router
  const [animated, setAnimated] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const scaleAnim = useState(new Animated.Value(0.9))[0];
  const titleSlideAnim = useState(new Animated.Value(-50))[0];
  const subtitleSlideAnim = useState(new Animated.Value(50))[0];
  const logoGlowAnim = useState(new Animated.Value(0.5))[0];
  const buttonScaleAnim = useState(new Animated.Value(1))[0];

  const particle1Anim = useState(new Animated.Value(0))[0];
  const particle2Anim = useState(new Animated.Value(0))[0];

  // ⚠️ MODIFICAÇÃO: Lógica de Navegação Automática
  useEffect(() => {
    // 5.5 segundos de animação total antes de navegar
    const TOTAL_ANIMATION_TIME = 5500; 
    let autoNavigateTimer: NodeJS.Timeout;

    // 1. Sequência principal de animação
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(titleSlideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(subtitleSlideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        // O loop do brilho da logo é iniciado abaixo, separadamente
      ]),
    ]).start(() => {
       setAnimated(true)
    });

    // 3. Loop do Brilho da Logo (independente da sequência principal)
    Animated.loop(
        Animated.sequence([
            Animated.timing(logoGlowAnim, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true,
            }),
            Animated.timing(logoGlowAnim, {
                toValue: 0.3,
                duration: 3000,
                useNativeDriver: true,
            }),
        ])
    ).start();

    // Loop das Partículas (se não estiverem dentro de FloatingParticles)
    // Se precisar, coloque aqui a lógica para animar particle1Anim e particle2Anim.
    
    setAnimated(true);

    // 4. Limpeza: Garante que o timer de navegação seja cancelado se o botão for pressionado
    return () => clearTimeout(autoNavigateTimer);

  }, []);

  const handlePressIn = useCallback(() => {
    Animated.spring(buttonScaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressOut = useCallback(() => {
    Animated.spring(buttonScaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, []);

  // ⚠️ MODIFICAÇÃO: Função de navegação manual (no clique do botão)
  const handleJourneyPress = useCallback(() => {
    console.log("Iniciando a Jornada...");
    // 5. NAVEGAÇÃO IMEDIATA: Substitui a tela de introdução pela de login
    router.replace('/sign-in');
  }, [router]);

  return (
    <View style={styles.container}>
      {/* Background Gradient com Camadas */}
      <LinearGradient
        colors={[COR_FUNDO_ESCURO, '#003366', '#0056A3', COR_PRIMARIA_CLARA]}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      {/* Camada de Estrelas */}
      <FloatingParticles />

      {/* Partículas Principais */}
      <Animated.View style={[
        styles.particle,
        styles.particle1,
        {
          opacity: particle1Anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.6, 0.3]
          }),
          transform: [
            { 
              translateY: particle1Anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -50]
              })
            }
          ]
        }
      ]} />
      
      <Animated.View style={[
        styles.particle,
        styles.particle2,
        {
          opacity: particle2Anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 0.2]
          }),
          transform: [
            { 
              translateY: particle2Anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 70]
              })
            }
          ]
        }
      ]} />

      {/* Conteúdo Principal */}
      <View style={styles.content}>
        
        {/* Logo com Efeito de Brilho */}
        <Animated.View style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}>
          <Animated.View style={[
            styles.logoGlow,
            {
              opacity: logoGlowAnim,
              transform: [
                {
                  scale: logoGlowAnim.interpolate({
                    inputRange: [0.3, 1],
                    outputRange: [0.8, 1.1]
                  })
                }
              ]
            }
          ]} />
          
          <View style={styles.logoWrapper}>
            <Image
              source={require('../assets/images/icon.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
            {/* Efeito de brilho externo */}
            <View style={styles.logoShine} />
          </View>
        </Animated.View>

        {/* Título com Efeito de Destaque */}
        <Animated.View style={[
          styles.titleContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: titleSlideAnim }]
          }
        ]}>
          <Text style={styles.mainTitle}>Centro Espírita</Text>
          <Text style={styles.mainSubtitle}>Online</Text>
          <View style={styles.titleDivider} />
        </Animated.View>

        {/* Frases Inspiradoras */}
        <Animated.View style={[
          styles.subtitleContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: subtitleSlideAnim }]
          }
        ]}>
          <AnimatedPhraseCycle />
          <Text style={styles.welcomeText}>
            Bem-vindo à sua jornada espiritual
          </Text>
        </Animated.View>

        {/* Botão com Feedback Tátil */}
        <Animated.View style={[
          styles.buttonContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: buttonScaleAnim }]
          }
        ]}>
          {/* ⚠️ MODIFICAÇÃO: Removido o <Link> e deixado apenas o TouchableOpacity */}
          <TouchableOpacity 
            style={styles.journeyButton}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handleJourneyPress} // ⬅️ Chama a função de navegação
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#FFFFFF', COR_DESTAQUE, '#87CEEB']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>Iniciar Jornada</Text>
              <View style={styles.buttonIcon}>
                <Text style={styles.icon}>⚡</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          
          {/* Texto de incentivo abaixo do botão */}
          <Text style={styles.encouragementText}>
            Sua evolução espiritual começa aqui
          </Text>
        </Animated.View>

        {/* Rodapé com Mensagem Inspiradora */}
        <Animated.View style={[
          styles.footer,
          { opacity: fadeAnim }
        ]}>
          
          <Text style={styles.versionText}>Versão 1.0.0</Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COR_FUNDO_ESCURO,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: height,
  },
  // Partículas Flutuantes
  floatingParticle: {
    position: 'absolute',
    backgroundColor: COR_DESTAQUE,
    borderRadius: 50,
  },
  particle: {
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: COR_DESTAQUE,
  },
  particle1: {
    width: 8,
    height: 8,
    top: '15%',
    left: '8%',
  },
  particle2: {
    width: 6,
    height: 6,
    bottom: '25%',
    right: '12%',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: height * 0.08,
    paddingBottom: 40,
  },
  // Logo Aprimorada
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  logoGlow: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: COR_DESTAQUE,
    shadowColor: COR_DESTAQUE,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 25,
    elevation: 15,
  },
  logoWrapper: {
    position: 'relative',
    zIndex: 10,
  },
  logoImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  logoShine: {
    position: 'absolute',
    top: -5,
    left: -5,
    right: -5,
    bottom: -5,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    zIndex: -1,
  },
  // Títulos
  titleContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  mainTitle: {
    fontSize: 38,
    fontWeight: '200',
    color: '#FFFFFF',
    letterSpacing: 3,
    textAlign: 'center',
    textShadowColor: 'rgba(179, 229, 252, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  mainSubtitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: COR_DESTAQUE,
    letterSpacing: 4,
    marginTop: -8,
    textAlign: 'center',
    textShadowColor: 'rgba(179, 229, 252, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  titleDivider: {
    width: 120,
    height: 3,
    backgroundColor: COR_DESTAQUE,
    marginTop: 20,
    borderRadius: 2,
    opacity: 0.8,
    shadowColor: COR_DESTAQUE,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  // Frases Animadas
  subtitleContainer: {
    alignItems: 'center',
    marginBottom: 35,
  },
  phraseContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  phraseText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
    letterSpacing: 0.8,
    marginBottom: 15,
    textAlign: 'center',
    lineHeight: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  cursor: {
    color: COR_OURO,
    fontWeight: 'bold',
  },
  phraseIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  phraseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  phraseDotActive: {
    backgroundColor: COR_OURO,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  welcomeText: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '300',
    letterSpacing: 1,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  // Botão Aprimorado
  buttonContainer: {
    alignItems: 'center',
  },
  journeyButton: {
    height: 68,
    width: width * 0.78,
    borderRadius: 34,
    overflow: 'hidden',
    shadowColor: COR_PRIMARIA_CLARA,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.7,
    shadowRadius: 20,
    elevation: 12,
    marginBottom: 15,
  },
  buttonGradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 35,
  },
  buttonText: {
    color: COR_FUNDO_ESCURO,
    fontSize: 19,
    fontWeight: 'bold',
    letterSpacing: 1.2,
  },
  buttonIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 46, 92, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  encouragementText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.6)',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  // Rodapé Aprimorado
  footer: {
    alignItems: 'center',
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  footerAuthor: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    marginBottom: 10,
  },
  versionText: {
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: 10,
    letterSpacing: 1,
  },
});