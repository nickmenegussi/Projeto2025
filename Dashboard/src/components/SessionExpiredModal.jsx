import React, { useContext, useEffect } from "react"
import { AuthContext } from "../context/auth"
import { Navigate, useNavigate } from "react-router"

export default function SessionExpiredModal({ onClose, logout }) {
  return (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold text-center">Sessão Expirada</h2>
        <p className="text-center text-gray-600 mt-4">
          Sua sessão expirou. Por favor, faça login novamente para continuar.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Sair
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}
