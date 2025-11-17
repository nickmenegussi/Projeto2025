import api from "../../services/api"

export const fetchEvents = async () => {
    try {
        const token = await localStorage.getItem("@Auth:token")

        const response = await api.get("/calendar/calendar", {
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
export const addLecture = async (formData) => {
    try {
        const token = await localStorage.getItem("@Auth:token")
        const response = await api.post('/calendar/calendar/register', formData, {
            headers: {
                Authorization: `Bearer ${token}`, 
                "Content-Type": "multipart/form-data",
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

export const deleteLecture = async (LibraryId) => {
    try {
        const token = localStorage.getItem("@Auth:token")
        const response = await api.delete(`/calendar/calendar/${LibraryId}/delete`, {
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


export const updateLecture = async (idCalendarEvents, field) => {
    try {
        const response = await api.patch(`/calendar/calendar/${idCalendarEvents}/${field}`, {
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