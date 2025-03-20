import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { AuthContext } from "../context/auth";

export default function PrivateRouter({ children }) {
<<<<<<< HEAD
  const { user, otpDigits, otpEmail, loading, logout } = useContext(AuthContext);
 
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
=======
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

>>>>>>> c973f471f4c824ee5a305a2991ddff6e9d0308b4
  return children;
}
