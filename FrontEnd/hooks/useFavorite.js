import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { handleApiError } from '../utils/handleApiError'
import { getAllFavoritesByUser } from '../services/ServiceFavorite'

export default function useFavorite() {
  const [favorite, setFavorite] = useState(null)
  const [loading, setLoading] = useState(true)


  const fetchFavorite = useCallback(async () => {
    try {
        const response = await getAllFavoritesByUser()
        setFavorite(response)
    } catch (error) {
        handleApiError(error)
    } finally {
        setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchFavorite()
  }, [fetchFavorite])
  return {favorite, loading, refresh: fetchFavorite}
}