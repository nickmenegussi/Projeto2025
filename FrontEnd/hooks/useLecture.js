import { View, Text } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import { getLecture } from "../services/lectureService"

export default function useLecture() {
  const [lecture, setLecture] = useState([])
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    fetchLectures();
  }, [])

  const fetchLectures  = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getLecture()
      if (data) {
        setLecture(data)
      }
    } catch (error) {
      console.error("Falha ao carrega os dados das avaliaçõoes", error)
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    fetchLectures ,
    lecture,
    loading,
  }
}
