import { createContext, useEffect, useState } from "react"
import api from "../services/api"
import { Navigate, useNavigate } from "react-router"

export const AuthContext = createContext()

// trocar LocalStorage pelo AsyncStorage

export function AuthProvider({children}){
    const [user, setUser] = useState(null)
    const [otpEmail, setOtpEmail] = useState(null)
    const [otpDigits, setOtpDigits] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    // verificar se já existe um login
    
    useEffect(() => {
        const dadosToken = localStorage.getItem('@Auth:token')
        const dadosUser = JSON.parse(localStorage.getItem('@Auth:user') || "[]")
        const dadosOtp = localStorage.getItem('@Auth:otp') || ""
        const dadosEmail = localStorage.getItem('@Auth:email') || ""

        if(dadosToken && dadosUser){
            setUser(dadosUser)
            api.defaults.headers.common["Authorization"] = `Bearer ${dadosToken}`
        }

        if(dadosOtp === "verificado!" ){
            setOtpDigits(dadosOtp)
        }

        if(dadosEmail === "true"){
            setOtpEmail(dadosEmail)
        }
        setLoading(false)
    }, [])

    // criando uma função para o futuro login do usuário e a partir desse contexto gerando o token

    async function login(email, senha){
        const response = await api.post('/auth/login/create', {
            email,
            senha
        })

        if(response.data.error){
            alert(response.data.error)
        } else {
            setUser(response.data.data.user)
            api.defaults.headers.common["Authorization"] = `Bearer ${response.data.data.token}`
            localStorage.setItem('@Auth:token', response.data.data.token)
            localStorage.setItem('@Auth:user', JSON.stringify(response.data.data.user))
            navigate("/emailOtp") // Redireciona após envio do OTP
        }
    }

    // update User

    function logout(){
        setUser(null)
        localStorage.removeItem('@Auth:token')
        localStorage.removeItem('@Auth:user')
        localStorage.removeItem('@Auth:email')
        localStorage.removeItem('@Auth:otp')
        delete api.defaults.headers.common["Authorization"]

        navigate('/dashboard') // troquei o Redirect do expo router, pois, o expo-router funciona somente para estruturas de pastas definidas e quando não está nao funciona
    }

    async function OtpSendEmail(email){
        try {
            const response = await api.post("/auth/otp/create", {
                email
            })
            setOtpEmail(response.data.data)
            alert(response.data.message)
            localStorage.setItem('@Auth:email', email)
        } catch (error) {
            console.error("Erro: ", error)
            
            if(error.response){
                alert(`Erro: ${error.response.data.message}`)
            }
        }
    }

    async function OtpVerification(otp){
        const email = localStorage.getItem('@Auth:email')
        try {
            const response = await api.post('/auth/otp/verification', {
                email,
                otp
            })
            alert(response.data.message)
            localStorage.setItem('@Auth:email', 'true')
            localStorage.setItem('@Auth:otp', 'verificado!')
            setOtpDigits(true)
        } catch (error) {
            console.error('Erro: ', error)

            if(error.response){
            alert(error.response.data.message)
            }
        }
    }

    
    return (
        <AuthContext.Provider value={{user, login, logout, otpEmail ,OtpSendEmail, otpDigits, OtpVerification, loading}}>
            {children}
        </AuthContext.Provider>
    )
}