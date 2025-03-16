import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import { AuthContext } from "../context/auth";

export default function PrivateRouter({ children }) {
  const { user, otpDigits, otpEmail, loading } = useContext(AuthContext);
  const navigate = useNavigate();
//   const [showModal, setShowModal] = useState(false)
 
//   useEffect(() => {
//     if(loading){
//       return <div>Carregando...</div>
//     } else { 
//       if (!user){
//       setShowModal(true)
//     }}
//   }, [user])


//   const handleLogout = () => {
//     logout()
//     setShowModal(true)
//     navigate('/')
//   }

//   const handleCloseModal = () => {
//     setShowModal(false)
//     navigate('/')
//   }


  if (!user) {
    navigate("/");
  } else if (!otpEmail) {
    navigate("/emailOtp");
  } else if (!otpDigits) {
    navigate("/otpVerification");
  }

  if (loading) {
    return <div className="text-black">Carregando... Aguarde</div>;
  }

  return children;
}
