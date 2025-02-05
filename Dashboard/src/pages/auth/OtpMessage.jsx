import React from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AuthSuccess() {
  const navigate = useNavigate();

  return (
    <div className="w-screen flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-blue-400 p-6 text-white">
      {/* Ícone de sucesso */}
      <div className="bg-green-500 p-6 rounded-full flex items-center justify-center shadow-lg">
        <CheckCircle size={80} color="white" />
      </div>
      
      {/* Texto de sucesso */}
      <h1 className="text-2xl font-bold mt-6">Autenticação válida!</h1>
      <p className="text-center mt-2 text-gray-200 px-4">
        Parabéns! A sua autenticação foi validada, agora, você pode entrar no nosso aplicativo!
      </p>

      {/* Botão de acesso */}
      <button
        onClick={() => navigate("/dashboard")}
        className="mt-6 cursor-pointer bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
      >
        Acessar Aplicativo
      </button>
    </div>
  );
}
