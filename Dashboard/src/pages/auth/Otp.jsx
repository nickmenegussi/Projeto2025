import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import FormField from "../../components/ui/FormField";
import api from "../../services/api";
import { useAuth } from "../../modules/auth/AuthContext";

export default function Otp() {
  const {OtpSendEmail} = useAuth()
  const [email, setEmail] = useState("")
  const navigate = useNavigate();

  async function OtpEntrar(){
    try {
      await OtpSendEmail(email)
      navigate('/auth/OtpVerification')
    } catch (error) {
      console.error('Erro: ', error)

      if(error.response) {
        alert(`Erro: ${error.response.data.message}`)
      }
    }
  }
  

  return (
    <div className="w-screen flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-blue-400 p-6">
      {/* Botão de voltar */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-8 left-4 bg-blue-400 p-2 rounded-lg"
      >
        <ArrowLeft color="white" size={30} />
      </button>

      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg mt-12">
        {/* Cabeçalho */}
        <h1 className="text-3xl font-bold text-blue-900">Digite seu Email</h1>
        <p className="mt-2 text-gray-600">
        Enviamos um código de 4 dígitos para seu e-mail. Insira-o abaixo para prosseguir

        </p>
        {/* Campo de e-mail */}
        <FormField title="Email" value={email} placeholder="Digite seu email" onChange={(event) => setEmail(event.target.value)} />
        <button onClick={OtpEntrar} 
          className="block w-full mt-6 bg-blue-600 text-white py-2 rounded-lg font-semibold text-center hover:bg-blue-700"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
