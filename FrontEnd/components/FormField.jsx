import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Platform 
} from 'react-native'
import React, { useState } from 'react'
import { ArrowLeft, ArrowRight, Eye, EyeOff } from 'lucide-react-native'

// Verifica se está no ambiente web
const isWeb = Platform.OS === 'web';

const FormField = ({ title, value, placeholder, handleChangeText, othersStyles, ...props }) => {
  const [showPassword, setShowPassword] = useState(false)
  
  return (
    <View style={[styles.container, props.containerStyle]}>
      <Text style={[styles.titleForms, props.titleStyle]}>{title}</Text>
      <View style={[
        styles.containerForms, 
        othersStyles,
        isWeb && styles.webContainerForms // Estilos específicos para web
      ]}>
        <TextInput 
          style={[
            styles.textoInput, 
            props.textInputStyle,
            isWeb && styles.webTextoInput // Estilos específicos para web
          ]}  
          value={value} 
          onChangeText={handleChangeText} 
          placeholder={placeholder} 
          placeholderTextColor={isWeb ? "#888" : undefined}
          keyboardType={props.keyboardType || "default"} 
          secureTextEntry={props.type === "Password"  && !showPassword}
        />
        
        {props.type === 'Password'  && (
          <TouchableOpacity 
            onPress={() => setShowPassword(!showPassword)} 
            style={styles.hideAndShow} 
          >
            {showPassword ? 
              <Eye color={isWeb ? "#555" : 'black'} size={19} /> : 
              <EyeOff color={isWeb ? "#555" : 'black'} size={19} />}
          </TouchableOpacity>
        )}
        
        {title === 'Avaliar o Centro Espírita' && (
          <TouchableOpacity 
            onPress={props.onIconPress} 
            style={props.IconStyle} 
          >
            <ArrowRight color={isWeb ? "#555" : 'black'} size={30} /> 
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: isWeb ? '100%' : 'auto', // Ajuste de largura para web
  },
  titleForms: {
    fontSize: 15,
    color: isWeb ? '#003B73' : '#FFFFFF', // Cor diferente para web
    fontWeight: isWeb ? '600' : 'normal', // Peso da fonte para web
    marginBottom: isWeb ? 5 : 0, // Espaçamento para web
  },
  textoInput: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
    paddingVertical: isWeb ? 12 : 0, // Padding para web
    color: isWeb ? '#333' : '#000', // Cor do texto para web
  },
  webTextoInput: {
    // Estilos específicos para web
    outlineStyle: 'none', // Remove contorno padrão do navegador
  },
  containerForms: {
    flexDirection: 'row',
    marginTop: 10,
    width: isWeb ? '100%' : '93%', // Largura total na web
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: isWeb ? 55 : 50, // Altura um pouco maior na web
    borderWidth: isWeb ? 1 : 0, // Borda para web
    borderColor: isWeb ? '#E2E8F0' : 'transparent', // Cor da borda para web
  },
  webContainerForms: {
    // Estilos específicos do container para web
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  hideAndShow: {
    padding: 15,
    flexDirection: 'row'
  }
})