import React, { useEffect, useState } from 'react'
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import Carousel from 'react-native-reanimated-carousel' // Nova biblioteca de carrossel
import { Bell, CircleUserRoundIcon, MenuIcon } from 'lucide-react-native'
import ButtonIcons from '../../../components/ButtonIcons'
import Trending from '../../../components/Navagation'
import EmptyContent from '../../../components/EmptyContent'
import api from "../../../services/api"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import { Calendar } from 'react-native-calendars';
import FAQ from '../../../components/FAQ'
import SideBar from "../../../components/Sidebar"
import ReviewCard from '../../../components/ReviewCard'

const Home = () => {
  const [lectures, setLectures] = useState([])
  const [VolunteerWork, setVolunteerWork] = useState([])
  const [calendar, setCalendar] = useState([])
  const [IsSideBarOpen, setIsSideBarOpen] = useState(false)

  console.log(calendar)
  console.log(VolunteerWork)

  useEffect(() => {
    ViewLectures()
    ViewVolunteerWork()
    ViewCalendar()
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
  async function ViewVolunteerWork() {
    try {
      const token = await AsyncStorage.getItem('@Auth:token')
      const response = await api.get('/volunteerWork/work', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      setVolunteerWork(response.data.data)
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

  async function ViewCalendar() {
    try {
      const token = await AsyncStorage.getItem('@Auth:token')
      const response = await api.get('/calendar/calendar', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      setCalendar(response.data.data)
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
    <>
         <SafeAreaView style={styles.safeAreaView}>
            <SideBar isOpen={IsSideBarOpen} setIsOpen={setIsSideBarOpen} />

        <FlatList
          data={[{ type: 'Palestras da Casa', content: lectures 
          }, {
            type: 'Trabalho Voluntário', content: VolunteerWork
          }, {type: 'Calendário de Eventos', content: calendar},
        {type: 'Esclarecimentos sobre o Centro Espírita'}, {
          type: 'Avaliações'
        }]}
          keyExtractor={(item) => item.type}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.header}>{item.type}</Text>
              {item.type ? (
                item.type === 'Palestras da Casa' ? (
                  <Carousel 
                    width={350} // Largura do carrossel
                    height={200} // Altura do carrossel
                    data={item.content}
                    renderItem={(item) => (
                      <View style={styles.carouselItem}>
                        <Text style={styles.titlePost}>{item.item.nameLecture}</Text>
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
                ) : 
                item.type === 'Trabalho Voluntário' ? (
                  <Carousel 
                    width={350} // Largura do carrossel
                    height={200} // Altura do carrossel
                    data={item.content}
                    renderItem={(item) => (
                      <View style={styles.carouselItem}>
                        <Text style={styles.titlePost}>{item.item.nameVolunteerWork}</Text>
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
                ) : 
                item.type === 'Calendário de Eventos' ? (
                  <Calendar 
                  style={styles.calendar}
                  theme={{
                    backgroundColor: '#4A90E2', // Fundo do calendário
                    calendarBackground: '#4A90E2',
                    textSectionTitleColor: '#fff',
                    selectedDayBackgroundColor: '#0A73D9', // Cor do dia selecionado
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#0A73D9',
                    dayTextColor: '#ffffff',
                    textDisabledColor: '#A0C1E8',
                    arrowColor: '#ffffff',
                    monthTextColor: '#ffffff',
                  }} />
                
                ) : item.type === 'Esclarecimentos sobre o Centro Espírita' ? (
                  <View style={styles.containerFaq}>
                    <FAQ />  
                  </View>
                ) : item.type === "Avaliações" ? (
                  <>
                    <View style={styles.ContainerReviews}>
                      <Text style={styles.header}>Avaliações do Centro Espírita</Text>
                      <ReviewCard name={'Teste'} comment={'Lorem'} rating={4} />
                      <ReviewCard name={'Teste'} comment={'Lorem'} rating={4} />
                      <ReviewCard name={'Teste'} comment={'Lorem'} rating={4} />
                    </View>
                  </>
                  
                ) : null
              ) : (
                <EmptyContent
              title="Ops! Nada por aqui"
              subtitle="Tente novamente mais tarde"
            />
              )
              }
              
            </View>
          )}
          ListHeaderComponent={() => (
            <View contentContainerStyle={styles.Container}>
              <View style={styles.containerIcons}>
                <ButtonIcons color={"white"} size={30} handleChange={() => setIsSideBarOpen(!IsSideBarOpen)} Icon={({ color, size }) => (
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
              <Trending navagations={[{name: 'Palestras da Casa', path: '/home/lectures', content: ViewLectures}, {name: 'Trabalhos voluntários', path: '/home/volunteerWork'}] ?? []} />
            </View>
          )}
        />
      </SafeAreaView>
    </>
    
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
    paddingVertical: 20,
    backgroundColor: '#003B73'
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
    marginBottom: 25
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
    right: 0
  },
  titlePost: {
    fontSize: 16,
    color: '#003B73',
    marginTop: 50
  },
  calendar: { 
    height: 550,
    borderRadius: 10,
    marginBottom: 40
  }, containerFaq: {
    marginBottom: 10
  }, ContainerReviews: {
    backgroundColor: '#60A3D9', 
    borderRadius: 10,
    padding: 20
  }
})