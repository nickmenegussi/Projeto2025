import { useCallback, useEffect, useState } from "react";
import {
  DeleteReview,
  getReview,
  RegisterReview,
  UpdateReview,
} from "../services/ServiceReview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import handleApiError from "../utils/handleApiError";

export default function useReview() {
  const [reviewUser, setReviewUser] = useState({
    descriptionReview: "",
    ratingReview: 0,
    userId: null,
    currentReviewId: null,
  });
  const [review, setReview] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState(null);
  const [userId, setUserId] = useState(null)

  // para buscar os dados automatiamente semrpe que a página for att

  const fetchReview = useCallback(async () => {
    try {
      const user = await AsyncStorage.getItem("@Auth:user");
      const userId = JSON.parse(user).idUser;
      if (userId) {
        setReviewUser(() => ({ ...reviewUser, userId: userId }));
        setUserId(userId)
      }
      setLoading(true);
      const data = await getReview(sortOrder || "newSet");
      if (data) {
        setReview(data);
      }
    } catch (error) {
      console.error("Falha ao carrega os dados das avaliaçõoes", error);
    } finally {
      setLoading(false);
    }
  }, [sortOrder]);

  const createReview = async () => {
    try {
      const newReview = await RegisterReview(reviewUser);
      if (newReview) {
        setModalVisible(false);
        setReviewUser({
          descriptionReview: "",
          ratingReview: 0,
          userId: null,
          currentReviewId: null,
        });
      }
    } catch {
      console.error("Erro ao criar avaliação", error);
    }
  };

  const updateReview = async (idReviewSociety) => {
    try {
      const updateReview = await UpdateReview(reviewUser, idReviewSociety);
      if (updateReview) {
        setModalVisible(false);
        setReviewUser({
          descriptionReview: "",
          ratingReview: 0,
          userId: null,
          currentReviewId: null,
        });
      }
    } catch {
      console.error("Erro ao criar avaliação", error);
    }
  };

  const handleRegisterReview = async () => {
    if (!reviewUser.descriptionReview || reviewUser.ratingReview === 0) {
      alert("Por favor, preencha a avaliação e dê uma nota.");
      return;
    }

    if (reviewUser.currentReviewId) {
      await updateReview(reviewUser.currentReviewId);
    } else {
      await createReview();
    }
    fetchReview();
  };
 
  const handleDeleteReview = async (idReviewSociety) => {
    if (!idReviewSociety) {
      Toast.show({
        type: "error",
        text1:
          "Erro ao receber a identificação do usuário e da avaliação a ser deletada. Tente novamente!",
        position: "bottom",
      });
      return;
    }

    if(!{...reviewUser.userId}){
      Toast.show({
        type: "error",
        text1:
          "Erro ao verificar o usuário logado!",
        position: "bottom",
      });
      return
    }
    console.log(...reviewUser.userId)
    try {
      const response = await DeleteReview(idReviewSociety, ...reviewUser.userId);
      if(response >= 400){
        return
      } 

      Toast.show({
        type: "success",
        text1: "Suceso deletar avaliação!",
        position: "bottom",
      });
      fetchReview();
    } catch (error) {
      handleApiError(error);
    }
  };

  return {
    review,
    reviewUser,
    setReviewUser,
    modalVisible,
    setModalVisible,
    loading,
    fetchReview,
    handleRegisterReview,
    createReview,
    sortOrder,
    updateReview,
    setSortOrder,
    handleDeleteReview,
    setUserId
  };
}
