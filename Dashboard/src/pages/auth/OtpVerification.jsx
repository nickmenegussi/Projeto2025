import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import FormField from "../../components/ui/FormField";
import { ArrowLeft, ArrowLeftCircle } from "lucide-react";
import api from "../../services/api";
import { useAuth } from "../../modules/auth/AuthContext";

export default function OtpVerification() {
  const {user,otpEmail, otpDigits,OtpVerification} = useAuth()
  const navigate = useNavigate();
  const [otp, setOtp] = useState("")
  
  async function Verification(){
      try {
        await OtpVerification(otp)
      } catch (error) {
        console.error('Erro: ', error)

        if(error.response){
          alert(error.response.data.message)
        }
      }
  }

  if (otpEmail && otpDigits){
    return <Navigate to={"/auth/OtpMessage"} />
  }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-blue-400">
      <button
              onClick={() => navigate("/emailOtp")}
              className="absolute top-8 left-4 bg-blue-400 p-2 rounded-lg"
            >
              <ArrowLeft color="white" size={30} />
            </button>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md relative">
        {/* Botão de voltar */}
        
        {/* Título e descrição */}
        <h2 className="text-2xl font-bold text-blue-900 text-center">
          Verificação de Senha
        </h2>
        <p className="text-gray-600 text-center mt-2">
          Insira o código de verificação enviado para seu email para continuar!
        </p>

        {/* Campos de verificação */}
        <div className="mt-6">
          <FormField value={otp} onChange={(event) => setOtp(event.target.value)} title={'Código de Verificação'} placeholder={'Digite o código'} othersStyles="w- h-12 text-center text-xl border rounded-lg" />
        </div>

        {/* Botão de enviar código */}
        <button
          onClick={Verification}
          className="block w-full mt-6 bg-blue-600 text-white py-2 rounded-lg font-semibold text-center hover:bg-blue-700"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
