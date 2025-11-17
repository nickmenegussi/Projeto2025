import api from "../../services/api"

export const fetchBook = async () => {
    try {
        const token = await localStorage.getItem("@Auth:token")
        
        const response = await api.get("/library/library", {
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
export const addBook = async (formData) => {
    try {
        const token = await localStorage.getItem("@Auth:token")
        const response = await api.post('/library/library/register', formData, {

            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data.message
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

export const deleteBook = async (LibraryId) => {
    try {
        const token = localStorage.getItem("@Auth:token")
        const response = await api.delete(`/library/library/${LibraryId}/delete`, {
            LibraryId,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
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


export const updateBook = async (LibraryId, field, value) => {
    try {
        const response = await api.patch(`/library/library/${LibraryId}/${field}`, {
            [field]: value,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data.message
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