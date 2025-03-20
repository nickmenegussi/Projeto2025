import React, { useState } from "react"
import { useNavigate } from "react-router"
import api from "../../services/api"
import { Calendar } from "primereact/calendar"
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"

export default function ModalUpdateEvent({
  titleModal,
  titleButton,
  iconButton,
  otherStyle,
  calendarEventsContent,
  onUpdate
}) {
  const [OpenModal, setOpenModal] = useState(false)
  const [calendarEventContent, setCalendarEventContent] = useState(
    calendarEventsContent
  )
  const [selectField, setSelectField] = useState("")
  const navigate = useNavigate()
  const [calendarEvents, setCalendarEvents] = useState({
    title: "",
    link: "",
    description: "",
    start: "",
    end: "",
    attachment: null,
    User_idUser: JSON.parse(localStorage.getItem("@Auth:user"))?.idUser || 0,
  })
  const token = localStorage.getItem("@Auth:token")

  function formatTimeForSQL(date) {
    if (!date) return null
    const localDate = new Date(date)

    const hours = String(localDate.getHours()).padStart(2, "0")
    const minutes = String(localDate.getMinutes()).padStart(2, "0")
    const seconds = String(localDate.getSeconds()).padStart(2, "0")

    return `${hours}:${minutes}:${seconds}`
  }

  async function UpdateCalendarEvents(idCalendarEvents, field, value) {
    try {
      if (field === "attachment") {
        const formData = new FormData()
        formData.append(field, value)

        const response = await api.patch(
          `/calendar/calendar/${idCalendarEvents}/${field}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data", // Define o tipo de conteúdo como multipart/form-data
            },
          }
        )
        alert(response.data.message)
        setOpenModal(false)
        onUpdate()
      } else {
        const response = await api.patch(
          `/calendar/calendar/${idCalendarEvents}/${field}`,
          {
            [field]: value,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json", // Corrigido para "application/json"
            },
          }
        )
        alert(response.data.message)
        setOpenModal(false)
        onUpdate()
      }
    } catch (error) {
      if (error.response) {
        if (
          error.response.data.message ===
          "Sessão expirada, por favor, faça login novamente."
        ) {
          alert(error.response.data.message)
          localStorage.clear()
          return navigate("/", { replace: true }) // Redireciona para a página de login
        } else {
          alert(error.response.data.message)
        }
      } else {
        alert(`Erro na requisição: ${error.message}`)
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectField) {
      if (selectField === "start" || selectField === "end") {
        UpdateCalendarEvents(
          calendarEventContent.idCalendarEvents,
          selectField,
          formatTimeForSQL(calendarEvents[selectField])
        )
      } else {
        UpdateCalendarEvents(
          calendarEventContent.idCalendarEvents,
          selectField,
          calendarEvents[selectField]
        )
      }
    } else {
      alert("Por favor, selecione um campo para atualizar.")
    }
  }

  return (
    <>
      <button
        onClick={() => setOpenModal(!OpenModal)}
        dateLecture-modal-target="crud-modal"
        dateLecture-modal-toggle="crud-modal"
        className={otherStyle}
        type="button"
      >
        {[iconButton, titleButton]}
      </button>

      {OpenModal && (
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-opacity-60"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700  max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {titleModal}
                </h3>
                <button
                  onClick={() => setOpenModal(false)}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  dateLecture-modal-toggle="crud-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round" // Corrigido para camelCase
                      strokeLinejoin="round" // Corrigido para camelCase
                      strokeWidth="2" // Corrigido para camelCase
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <form className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2 sm:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Qual item você deseja mudar?
                    </label>
                    <select
                      value={selectField}
                      onChange={(e) => setSelectField(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    >
                      <option value="">Selecionar um item</option>
                      <option value="title">Título do Evento</option>
                      <option value="link">Link</option>
                      <option value="description">Descrição</option>
                      <option value="start">Horário Inicial</option>
                      <option value="end">Horário Final</option>
                      <option value="attachment">Anexo</option>
                    </select>
                  </div>

                  <div className="col-span-2 flex flex-col gap-6">
                    {selectField === "title" && (
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Título do Evento
                        </label>
                        <input
                          type="text"
                          value={calendarEvents[selectField]}
                          onChange={(e) =>
                            setCalendarEvents({
                              ...calendarEvents,
                              [selectField]: e.target.value,
                            })
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Digite o nome da palestra"
                          required
                        />
                      </div>
                    )}

                    {selectField === "description" && (
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Descrição do Evento
                        </label>
                        <textarea
                          rows="2"
                          value={calendarEvents[selectField]}
                          onChange={(e) =>
                            setCalendarEvents({
                              ...calendarEvents,
                              [selectField]: e.target.value,
                            })
                          }
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Digite a descrição da palestra"
                        ></textarea>
                      </div>
                    )}

                    {selectField === "link" && (
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Link do Evento
                        </label>
                        <input
                          type="text"
                          value={calendarEvents[selectField]}
                          onChange={(e) =>
                            setCalendarEvents({
                              ...calendarEvents,
                              [selectField]: e.target.value,
                            })
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          required
                        />
                      </div>
                    )}

                    {selectField === "start" && (
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Data de Início
                        </label>
                        <Calendar
                          showTime
                          className="border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full"
                          hourFormat="24"
                          showIcon
                          timeOnly
                          value={calendarEvents[selectField]}
                          onChange={(e) =>
                            setCalendarEvents({
                              ...calendarEvents,
                              [selectField]: e.value,
                            })
                          }
                        />
                      </div>
                    )}

                    {selectField === "end" && (
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Final da Palestra
                        </label>
                        <Calendar
                          className="border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full"
                          showTime
                          hourFormat="24"
                          showIcon
                          timeOnly
                          value={calendarEvents[selectField]}
                          onChange={(e) =>
                            setCalendarEvents({
                              ...calendarEvents,
                              [selectField]: e.value,
                            })
                          }
                        />
                      </div>
                    )}
                    {selectField === "attachment" && (
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Anexo da Palestra
                        </label>
                        <input
                          id="attachment"
                          name="attachment"
                          type="file"
                          onChange={(e) =>
                            setCalendarEvents({
                              ...calendarEvents,
                              [selectField]: e.target.files[0], // Corrigido para files[0]
                            })
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          required
                        />
                      </div>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="mt-5 text-white cursor-pointer inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd" // Corrigido para camelCase
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd" // Corrigido para camelCase
                    ></path>
                  </svg>
                  Confirmar atualizações
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}