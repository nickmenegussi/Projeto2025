import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../../components/FormField";
import { ArrowLeft, ArrowLeftCircle } from "lucide-react";

export default function OtpVerification() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-blue-400">
      <button
              onClick={() => navigate("/")}
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
        <div className="flex justify-between mt-6 gap-2">
          <FormField othersStyles="w-12 h-12 text-center text-xl border rounded-lg" />
          <FormField othersStyles="w-12 h-12 text-center text-xl border rounded-lg" />
          <FormField othersStyles="w-12 h-12 text-center text-xl border rounded-lg" />
          <FormField othersStyles="w-12 h-12 text-center text-xl border rounded-lg" />
        </div>

        {/* Botão de enviar código */}
        <Link
          to="/"
          className="block w-full mt-6 bg-blue-600 text-white py-2 rounded-lg font-semibold text-center hover:bg-blue-700"
        >
          Entrar
        </Link>
      </div>
    </div>
  );
}
