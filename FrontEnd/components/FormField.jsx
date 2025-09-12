import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Eye, EyeOff } from "lucide-react-native";

const isWeb = Platform.OS === "web";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  othersStyles,
  containerStyle,
  titleStyle,
  textInputStyle,
  keyboardType,
  inputMode,
  pattern,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Função para filtrar apenas números se for um campo numérico
  const handleTextChange = (text) => {
    if (keyboardType === "numeric" || inputMode === "numeric") {
      // Remove qualquer caractere que não seja número
      const numericText = text.replace(/[^0-9]/g, "");
      handleChangeText(numericText);
    } else {
      handleChangeText(text);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {title && <Text style={[styles.titleForms, titleStyle]}>{title}</Text>}
      <View
        style={[
          styles.containerForms,
          othersStyles,
          isWeb && styles.webContainerForms,
        ]}
      >
        {isWeb ? (
          // Para web, usa inputMode e pattern
          <TextInput
            style={[styles.textoInput, textInputStyle, styles.webTextoInput]}
            value={value}
            onChangeText={handleTextChange}
            placeholder={placeholder}
            placeholderTextColor="#888"
            secureTextEntry={title === "Password" && !showPassword}
            keyboardType={keyboardType || "default"}
            inputMode={inputMode || "text"}
            pattern={pattern}
            maxLength={4}
            {...props}
          />
        ) : (
          // Para mobile, usa apenas keyboardType
          <TextInput
            style={[styles.textoInput, textInputStyle]}
            value={value}
            maxLength={4}
            onChangeText={handleTextChange}
            placeholder={placeholder}
            secureTextEntry={title === "Password" && !showPassword}
            keyboardType={keyboardType || "default"}
            {...props}
          />
        )}

        {title === "Password" && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.hideAndShow}
          >
            {showPassword ? (
              <Eye color={isWeb ? "#555" : "black"} size={19} />
            ) : (
              <EyeOff color={isWeb ? "#555" : "black"} size={19} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: "100%",
    marginBottom: 15,
  },
  titleForms: {
    fontSize: 15,
    color: "#003B73",
    fontWeight: "600",
    marginBottom: 5,
  },
  textoInput: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    color: "#333",
  },
  webTextoInput: {
    outlineStyle: "none",
  },
  containerForms: {
    flexDirection: "row",
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    height: 55,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  webContainerForms: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  hideAndShow: {
    padding: 15,
    flexDirection: "row",
  },
});

export default FormField;
