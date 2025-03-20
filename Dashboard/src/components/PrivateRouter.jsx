import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import { AuthContext } from "../context/auth";

export default function PrivateRouter({ children }) {
  const { user, otpDigits, otpEmail, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-black">Carregando... Aguarde</div>;
  }
  if (!user) {
    return <Navigate to="/" />;
  }

  if (!otpEmail) {
    return <Navigate to="/emailOtp" />;
  }
  if (!otpDigits) {
    return <Navigate to="/otpVerification" />; // Use Navigate para redirecionar
  }

  return children;
}
