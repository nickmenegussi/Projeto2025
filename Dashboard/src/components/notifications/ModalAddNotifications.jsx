import React, { useState } from "react"
import api from "../../services/api"
import { useNavigate } from "react-router"
import { Calendar } from "primereact/calendar"
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"

export default function ModalUpdateAdd({ titleModal, titleButton, iconButton, otherStyle, onUpdate }) {
  const [openModal, setOpenModal] = useState(false)
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState({
    message: "",
    isRead: false,
    User_idUser: JSON.parse(localStorage.getItem('@Auth:user')).idUser,
  })

  const token = localStorage.getItem('@Auth:token')

  async function CreateVolunteerWork(event) {
    event.preventDefault()
    const { message, isRead, User_idUser} = notifications

    try {
      const response = await api.post(
        "/notifications/notifications/create",
        {
            message,
            isRead,
            User_idUser,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      alert(response.data.message)
      setOpenModal(false)
      onUpdate()
    } catch (error) {
      console.error("Erro na requisição:", error)
      if (error.response.data.message === "Sessão expirada, por favor, faça login novamente.") {
        localStorage.clear()
        return navigate("/", { replace: true })
      } else {
        alert(error.response.data.message)
      }
    }
  }

  return (
    <>
      <button onClick={() => setOpenModal(!openModal)} className={otherStyle} type="button">
        {iconButton} {titleButton}
      </button>

      {openModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{titleModal}</h3>
                <button
                  onClick={() => setOpenModal(false)}
                  className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600"
                >
                  &times
                </button>
              </div>

              <form className="p-4 md:p-5" onSubmit={CreateVolunteerWork}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mesangem das Notificações</label>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full"
                      placeholder="Digite a mensagem da notificação"
                      required
                      value={notifications.message}
                      onChange={(e) => setNotifications({ ...notifications, message: e.target.value })}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 w-full"
                >
                  Adicionar trabalho
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
