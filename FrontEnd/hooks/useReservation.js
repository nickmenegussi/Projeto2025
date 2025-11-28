import { useState, useEffect } from 'react'
import {getReservationById}  from '../services/ServiceReserves' // Você precisará criar esta função

const useReservation = () => {
  const [reservation, setReservation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [hasReservation, setHasReservation] = useState(true)

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const reservation = await getReservationById()
        if(reservation){
          setReservation(reservation.data)
          setHasReservation(reservation.HasAReserve)
        }
      } catch (error) {
        console.error("Erro ao carregar Reservas", error)
      } finally {
        setLoading(false)
      }
    }
    fetchReservation()
  }, [])
  
  return { reservation, hasReservation, loading }
}

export default useReservation