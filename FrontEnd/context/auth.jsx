import { createContext, useEffect, useState } from "react"
import api from "../services/api"
import { useRouter } from "expo-router"

export const AuthContext = createContext()

// trocar LocalStorage pelo AsyncStorage

export function AuthProvider({children}){
    const [user, setUser] = useState(null)
    const router = useRouter()

    // verificar se já existe um login

    useEffect(() => {
        const dadosToken = localStorage.getItem('@Auth:token')
        const dadosUser = JSON.parse(localStorage.getItem('@Auth:user') || "[]")

        if(dadosToken && dadosToken){
            setUser(dadosUser)
            api.defaults.headers.common["Authorization"] = `Bearer ${dadosToken}`
        }
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
        }
    }

    // update User

    function logout(){
        setUser(null)
        localStorage.clear()
        delete api.defaults.headers.common["Authorization"]

        router.push('/sign-up') // troquei o Redirect do expo router, pois, o expo-router funciona somente para estruturas de pastas definidas e quando não está nao funciona
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
