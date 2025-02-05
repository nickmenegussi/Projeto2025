import React, { useContext, useRef, useState } from "react";
import FormField from "../../components/FormField";
import { AuthContext } from "../../context/auth";
import { Link, Navigate, useNavigate } from "react-router";

export default function SignUp() {
  const navigate = useNavigate();
  const { login, user, otpDigits , otpEmail} = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function Entrar() {
    try {
      await login(email, password);
      alert("Login realizado com sucesso!");
    } catch (error) {
      // qualquer erro que seja por conta do js ou do frontend
      console.error("Erro:", error);

      if (error.response) {
        alert(`Erro: ${error.response.data.response}`);
      }
    }
  }

  if(user && otpDigits && otpEmail){
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gradient-to-b from-blue-900 to-blue-400 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold text-center text-blue-900">
          Iniciar Login Admin
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Crie a sua conta ou faça seu login para explorar nosso app!
        </p>
        <div className="mt-6">
          <FormField
            othersStyles="w-1/2 min-w-[120px] rounded-lg h-10"
            title="Email"
            value={email}
            placeholder="Digite sua senha"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="mt-4">
          <FormField
            othersStyles="w-1/2 min-w-[120px] rounded-lg h-10"
            title="Senha"
            placeholder="Digite sua senha"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div className="flex justify-end mt-3">
          <Link
            to="/forgottenPassword"
            className="text-blue-500 hover:underline"
          >
            Esqueceu sua senha?
          </Link>
        </div>

        <button
          className="block cursor-pointer w-full mt-6 bg-blue-600 text-white py-2 rounded-lg font-semibold text-center hover:bg-blue-700"
          onClick={Entrar}
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
