import { View, Text } from "react-native"
import React, { useCallback, useState } from "react"
import { getReview } from "../services/reviewService"

export default function useLecture() {
  const [lecture, setLecture] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchReview = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getReview()
      if (data) {
        setLecture(data)
      }
    } catch (error) {
      console.error("Falha ao carrega os dados das avaliaçõoes", error)
    } finally {
      setLoading(false)
    }
  })

  return {
    fetchReview,
    lecture,
    loading,
  }
}
