import React, { useEffect, useState } from 'react'
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import Carousel from 'react-native-reanimated-carousel' // Nova biblioteca de carrossel
import { Bell, CircleUserRoundIcon, MenuIcon } from 'lucide-react-native'
import ButtonIcons from '../../../components/ButtonIcons'
import Trending from '../../../components/Trending'
import EmptyContent from '../../../components/EmptyContent'
import api from "../../../services/api"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'

const Home = () => {
  const [lectures, setLectures] = useState([])

  useEffect(() => {
    ViewLectures()
  }, [])

  async function ViewLectures() {
    try {
      const token = await AsyncStorage.getItem('@Auth:token')
      const response = await api.get('/lectures/lectures', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      setLectures(response.data.data)
    } catch (error) {
      if (error.response) {
        if (error.response.data.loginRequired === true) {
          console.log('Erro', error.response.data)
          Alert.alert('Erro', error.response.data.message)
          router.push('/sign-up')
        } else {
          console.log('Erro', error.response.data)
          Alert.alert('Erro', error.response.data.message)
        }
      } else {
        console.log('Erro', error)
      }
    }
  }


  return (
    <LinearGradient
      colors={['#003B73', '#60A3D9']}
      end={{ x: 0, y: 1 }}
      locations={[0, 4]}
      style={styles.linearGradient}
    >
      <SafeAreaView style={styles.safeAreaView}>
        <FlatList
          data={[{ type: 'Palestras da Casa', content: lectures }]}
          keyExtractor={(item) => item.type}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.header}>{item.type}</Text>
              {item.type === 'Palestras da Casa' && item.content.length > 0 && (
                <Carousel 
                  width={350} // Largura do carrossel
                  height={200} // Altura do carrossel
                  data={item.content}
                  renderItem={(item) => (
                    <View style={styles.carouselItem} sour>
                      <Text style={styles.title}>{item.item.nameLecture}</Text>
                    </View>
                  )}
                  scrollAnimationDuration={1000}
                  autoPlay={true}
                  loop={true}
                  autoPlayInterval={3000}
                  mode="parallax"
                  modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 54,
                  }}
                />
              )}
            </View>
          )}
          ListHeaderComponent={() => (
            <View contentContainerStyle={styles.Container}>
              <View style={styles.containerIcons}>
                <ButtonIcons color={"white"} size={30} Icon={({ color, size }) => (
                  <MenuIcon color={color} size={size} />
                )} />
                <View style={styles.IconsContent}>
                  <ButtonIcons color={"white"} size={30} Icon={({ color, size }) => (
                    <Bell color={color} size={size} />
                  )} />
                  <ButtonIcons color={"white"} size={30} Icon={({ color, size }) => (
                    <CircleUserRoundIcon color={color} size={size} />
                  )} />
                </View>
              </View>
              <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }] ?? []} />
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyContent
              title="Ops! Nada por aqui"
              subtitle="Tente novamente mais tarde"
            />
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  )
}

export default Home

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  safeAreaView: {
    flexGrow: 1,
    padding: 10,
    paddingVertical: 20
  },
  Container: {
    flexGrow: 1,
    padding: 10,
    paddingVertical: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 10,
  },
  containerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  IconsContent: {
    flexDirection: 'row',
    gap: 10
  },
  carouselItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'start',
    height:150,
    right: 20
  },
  title: {
    fontSize: 16,
    color: '#003B73',
    marginTop: 25
  },
})
