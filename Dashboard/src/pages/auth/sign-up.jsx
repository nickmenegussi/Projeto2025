import React, { useState } from "react";
import { Link } from "react-router";
import FormField from "../../components/FormField";

export default function SignUp() {
  const [form, setForm] = useState({ email: "", password: "" });

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gradient-to-b from-blue-900 to-blue-400 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold text-center text-blue-900">
          Iniciar Login
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Crie a sua conta ou faça seu login para explorar nosso app!
        </p>

        <div className="flex mt-4 bg-gray-200 rounded-lg p-2">
          <Link
            to={"/"}
            className="w-1/2 mx-auto py-2 text-center rounded-lg bg-white text-blue-900 font-medium hover:"
          >
            Login
          </Link>
        </div>

        <div className="mt-6">
          <FormField
            othersStyles="w-1/2 min-w-[120px] rounded-lg h-10"
            title="Email"
            value={form.email}
            placeholder="Digite sua senha"
            handleChangeText={(e) => setForm({ ...form, email: e })}
          />
        </div>

        <div className="mt-4">
          <FormField
            othersStyles="w-1/2 min-w-[120px] rounded-lg h-10"
            title="Senha"
            value={form.password}
            placeholder="Digite sua senha"
            handleChangeText={(e) => setForm({ ...form, password: e })}
          />
        </div>

        <div className="flex justify-end mt-3">
          <Link
            href="/forgottenPassword"
            className="text-blue-500 hover:underline"
          >
            Esqueceu sua senha?
          </Link>
        </div>

        <Link
          to="/emailOtp"
          className="block w-full mt-6 bg-blue-600 text-white py-2 rounded-lg font-semibold text-center hover:bg-blue-700"
        >
          Entrar
        </Link>
      </div>
    </div>
  );
}
