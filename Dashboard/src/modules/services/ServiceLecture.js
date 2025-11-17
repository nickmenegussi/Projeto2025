import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import handleApiError from "../utils/habdleapiError";

export const fetchLecture = async () => {
  try {
    const token = await localStorage.getItem("@Auth:token");
    const response = await api.get("/lectures/lectures", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const addLecture = async (
  nameLecture,
  dateLecture,
  timeLecture,
  description,
  link_url,
  video_url
) => {
  try {
    const token = await localStorage.getItem("@Auth:token");
    const response = await api.post(
      "/lectures/lectures/create",
      {
        nameLecture: nameLecture,
        dateLecture: dateLecture,
        timeLecture: timeLecture,
        description: description,
        link_url: link_url,
        video_url: video_url,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.message;
  } catch (error) {
    if (error.response) {
      if (error.response.data.loginRequired === true) {
        console.log("Erro", error.response.data);
        alert("Erro", error.response.data.message);
        navigate("/auth/login");
      } else {
        console.log("Erro", error.response.data);
        alert("Erro", error.response.data.message);
        return null;
      }
    } else {
      alert(`Erro na requisição: `, error);
      console.log("Erro", error);
      return null;
    }
  }
};

export const deleteLecture = async (LibraryId) => {
  try {
    const token = localStorage.getItem("@Auth:token");
    const response = await api.delete(`/library/library/${LibraryId}/delete`, {
      LibraryId,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.message;
  } catch (error) {
    if (error.response) {
      if (error.response.data.loginRequired === true) {
        console.log("Erro", error.response.data);
        alert("Erro", error.response.data.message);
        navigate("/auth/login");
      } else {
        console.log("Erro", error.response.data);
        alert("Erro", error.response.data.message);
        return null;
      }
    } else {
      alert(`Erro na requisição: `, error);
      console.log("Erro", error);
      return null;
    }
  }
};

export const updateLecture = async (idLecture, field, value) => {
  try {
    const response = await api.patch(
      `/lectures/lectures/${idLecture}/${field}`,
      {
        [field]: value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.message;
  } catch (error) {
    if (error.response) {
      if (error.response.data.loginRequired === true) {
        console.log("Erro", error.response.data);
        alert("Erro", error.response.data.message);
        navigate("/auth/login");
      } else {
        console.log("Erro", error.response.data);
        alert("Erro", error.response.data.message);
        return null;
      }
    } else {
      alert(`Erro na requisição: `, error);
      console.log("Erro", error);
      return null;
    }
  }
};
