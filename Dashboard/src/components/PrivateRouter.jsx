import React, { useContext } from "react"
import { AuthContext } from "../context/auth"
import { Navigate } from "react-router"

export default function PrivateRouter({ children }) {
  const {user, otpDigits,otpEmail } = useContext(AuthContext)

  if (!user) {
    return <Navigate to={"/"} replace/>
  }

  if (!otpEmail) {
    return <Navigate to={"/emailOtp"} replace/>
  }

  if (!otpDigits) {
    return <Navigate to={"/otpVerification"} replace/>
  }

  
  return children
}
