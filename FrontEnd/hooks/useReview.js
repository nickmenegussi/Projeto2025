import { useCallback, useEffect, useState } from "react"
import { getReview, RegisterReview, UpdateReview } from "../services/ServiceReview"
import AsyncStorage from "@react-native-async-storage/async-storage"


export default function useReview() {
  const [reviewUser, setReviewUser] = useState({
    descriptionReview: "",
    ratingReview: 0,
    userId: null,
    currentReviewId: null,
  })
  const [review, setReview] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sortOrder, setSortOrder] = useState(null)

  // para buscar os dados automatiamente semrpe que a página for att

  const fetchReview = useCallback(async () => {
    try {
      const user = await AsyncStorage.getItem("@Auth:user")
      const userId = JSON.parse(user).idUser
      if (userId) {
        setReviewUser(() => ({ ...reviewUser, userId: userId }))
      }
      setLoading(true)
      const data = await getReview(sortOrder || "newSet")
      if (data) {
        setReview(data)
      }
    } catch (error) {
      console.error("Falha ao carrega os dados das avaliaçõoes", error)
    } finally {
      setLoading(false)
    }
  }, [sortOrder])

  const createReview = async () => {
    try {
      const newReview = await RegisterReview(reviewUser)
      if (newReview) {
        setModalVisible(false)
        setReviewUser({
          descriptionReview: "",
          ratingReview: 0,
          userId: null,
          currentReviewId: null,
        })
      }
    } catch {
      console.error("Erro ao criar avaliação", error)
    }
  }

  const updateReview = async (idReviewSociety) => {
    try {
        const updateReview = await UpdateReview(reviewUser, idReviewSociety)
        if (updateReview) {
          setModalVisible(false)
          setReviewUser({
            descriptionReview: "",
            ratingReview: 0,
            userId: null,
            currentReviewId: null,
          })
        }
    } catch {
        console.error("Erro ao criar avaliação", error)
    }
  }

  return {
    review,
    reviewUser,
    setReviewUser,
    modalVisible,
    setModalVisible,
    loading,
    fetchReview,
    createReview,
    sortOrder,
    updateReview,
    setSortOrder,
  }
}
