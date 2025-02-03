import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mt-3">
      <label className="text-sm font-medium text-black">{title}</label>
      <div className={`flex items-center mt-2 w-full max-w-md p-3 bg-white rounded-lg border-1 ${otherStyles}`}>
        <input
        // para fazer com que o titulo do meu campo field seja senha ou texto, se for senha, mostre a senha
          type={title === "Senha" && !showPassword ? "Senha" : "text"}
          value={value}
          onChange={(e) => handleChangeText(e.target.value)}
          placeholder={placeholder}
          className="w-full outline-none text-black"
        />
        {title === "Senha" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="p-2"
          >
            {showPassword ? <Eye size={19} className="text-black" /> : <EyeOff size={19} className="text-black" />}
          </button>
        )}
      </div>
    </div>
  );
};

export default FormField;
