import React, { useState } from "react"
import api from "../../services/api"
import { useNavigate } from "react-router"
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import { Calendar } from "primereact/calendar"

export default function ModalAddEvent({
  titleModal,
  titleButton,
  iconButton,
  otherStyle,
  onUpdate,
}) {
  const [OpenModal, setOpenModal] = useState(false)
  const navigate = useNavigate()
  const [calendarEvents, setCalendarEvents] = useState({
    title : "",
    link : "",
    description : "",
    start : "",
    end: "",
    attachment  : null,
    User_idUser: JSON.parse(localStorage.getItem('@Auth:user'))?.idUser || 0
  })

  const token = localStorage.getItem("@Auth:token")

  function formatTimeForSQL(date) {
    if (!date) return null;
    const localDate = new Date(date)
    const hours = String(localDate.getHours()).padStart(2, '0')
    const minutes = String(localDate.getMinutes()).padStart(2, '0')
    const seconds = String(localDate.getSeconds()).padStart(2, '0')

    return `${hours}:${minutes}:${seconds}`
    }

  async function CreateEvent(event){
    event.preventDefault()

    try {
        const {title, link, description, start, end, attachment, User_idUser} = calendarEvents

        const formdata = new FormData()
        formdata.append('title', title)
        formdata.append('link', link)
        formdata.append('description', description)
        formdata.append('start', formatTimeForSQL(start))
        formdata.append('end', formatTimeForSQL(end))
        formdata.append('attachment', attachment)
        formdata.append('User_idUser', parseInt(User_idUser))

        const response = await api.post('/calendar/calendar/register', formdata, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        })
        alert(response.data.message)
        setCalendarEvents({title : "",
            link : "",
            description : "",
            start : "",
            end: "",
            attachment  : null,
            User_idUser: JSON.parse(localStorage.getItem('@Auth:user')).idUser})
        setOpenModal(false)
        onUpdate()
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
          }          
    }
  }

  return (
    <>
      <button
        onClick={() => setOpenModal(!OpenModal)}
        data-modal-target="crud-modal"
        data-modal-toggle="crud-modal"
        className={otherStyle}
        type="button"
      >
        {[iconButton, titleButton]}
      </button>

      {OpenModal && (
        <div
          id="crud-modal"
          tabindex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-opacity-60"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm max-h-[80vh] overflow-y-auto dark:bg-gray-700">
              <div className="flex items-center justify-between  p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {titleModal}
                </h3>
                <button
                  onClick={() => setOpenModal(false)}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="crud-modal"
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
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <form className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      for="eventTitle"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Título do Evento
                    </label>
                    <input
                      type="text"
                      name="eventTitle"
                      value={calendarEvents.title}
                      onChange={(e) => setCalendarEvents({...calendarEvents, title: e.target.value})}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white-400 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Digite o título do Evento"
                      required=""
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      for="EventLink "
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Link do Evento
                    </label>
                    <input
                      type="text"
                      name="EventLink "
                      value={calendarEvents.link}
                      onChange={(e) => setCalendarEvents({...calendarEvents, link: e.target.value})}
                      id="EventLink "
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white-400 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Digite o autor do livro"
                      required=""
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      for="EventStart"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Horário do Início Evento
                    </label>
                    <Calendar
                    timeOnly
                    showIcon
                    showTime
                    hourFormat="24"
                    value={calendarEvents.start}
                    onChange={(e) => setCalendarEvents({...calendarEvents, start: e.value})}
                    className="border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full"
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      for="EventFinal"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Horário do Final do Evento
                    </label>
                    <Calendar
                    timeOnly
                    showIcon
                    showTime
                    hourFormat="24"
                    value={calendarEvents.end}
                    onChange={(e) => setCalendarEvents({...calendarEvents, end: e.value})}
                    className="border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full"
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      for="attachment"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Anexo
                    </label>
                    <input
                      id="attachment"
                      rows="2"
                      type="file"
                      onChange={(e) => setCalendarEvents({... calendarEvents, attachment: e.target.files[0]})}
                      name="attachment"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white-400 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Digite a curiosidade do livro aqui"
                    ></input>
                  </div>
                  <div className="col-span-2">
                    <label
                      for="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Descrição
                    </label>
                    <textarea
                      id="description"
                      rows="2"
                      type="text"
                      name="description"
                      value={calendarEvents.description}
                      onChange={(e) => setCalendarEvents({... calendarEvents, description: e.target.value})}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white-400 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Digite a curiosidade do livro aqui"
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  onClick={CreateEvent}
                  className="text-white cursor-pointer inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Adicionar evento
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
