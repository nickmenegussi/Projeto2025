import api from "../../services/api"

export const fetchUser = async () => {
    try {
        const token = await localStorage.getItem("@Auth:token")
        const response = await api.get("/user/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data
    } catch (error) {
        if (error.response) {
            if (error.response.data.loginRequired === true) {
                console.log("Erro", error.response.data)
                alert("Erro", error.response.data.message)
                navigate("/auth/login")
            } else {
                console.log("Erro", error.response.data)
                alert("Erro", error.response.data.message)
                return null
            }
        } else {
            alert(`Erro na requisição: `, error)
            console.log("Erro", error)
            return null
        }
    }
}
