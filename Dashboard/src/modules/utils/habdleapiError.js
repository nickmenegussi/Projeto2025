import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function handleApiError(error) {
  if (error?.response?.data) {
    const data = error.response.data;

    if (data.loginRequired) {
      console.log("Sessão expirada:", data.message);
      Swal.fire({
        title: "Sessão Expirada!",
        text: data.message,
        icon: "info",
      });
      localStorage.clear();
      window.location.href = "/auth/login";
      return;
    }

    console.log("Erro da API:", data.data || data);
    Swal.fire({
      title: "Ocorreu um erro.",
      text: data.message,
      icon: "error",
    });
    return;
  }
}
