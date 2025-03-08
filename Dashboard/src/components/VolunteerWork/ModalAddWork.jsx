import React, { useState } from "react"
import api from "../../services/api"
import { useNavigate } from "react-router"
import { Calendar } from "primereact/calendar"
import "primereact/resources/themes/lara-light-indigo/theme.css" // Exemplo de tema
import "primereact/resources/primereact.min.css" // Estilos do PrimeReact
import "primeicons/primeicons.css" // Estilos de ícones

export default function ModalWorkVolunteerAdd({titleModal, titleButton ,iconButton, otherStyle }) {
  const [OpenModal, setOpenModal] = useState(false)
  const navigate = useNavigate()
  const [volunteerWork, setVolunteerWork] = useState({
    nameVolunteerWork: "",
    address : "",
    dateVolunteerWork: "",
    work_description: ""
  })

  const token = localStorage.getItem('@Auth:token')
  
  function formatDateForSQL(date) {
    if (!date) return null;
    return new Date(date).toLocaleDateString("fr-CA"); // Formato 'YYYY-MM-DD'
  }

  async function CreateVolunteerWork(event){
    event.preventDefault()
    const {nameVolunteerWork, address, dateVolunteerWork ,work_description} = volunteerWork

    try {
      const response = await api.post('/VolunteerWork/work/create',{
        nameVolunteerWork: nameVolunteerWork,
        address : address ,
        dateVolunteerWork: formatDateForSQL(dateVolunteerWork),
        work_description: work_description,
      }, {
        
        headers: {
          Authorizationization: `Bearer ${token}`
        }
      })
      alert(response.data.message)
      setOpenModal(false)
    } catch (error) {
      if(error.response){
        if(error.response.data.message === "Sessão expirada, por favor, faça login novamente."){
          alert(error.response.data.message)
          localStorage.clear()
          navigate("/", { replace: true }) // Redireciona para a página de login
        }
      } else {
        alert(`Erro na requisição: `, error.response.data.message)
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
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
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
                  <span className="sr-only" >Close modal</span>
                </button>
              </div>

              <form className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      for="namebook"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Nome do trabalho
                    </label>
                    <input
                      type="text"
                      name="namebook"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Digite o nome do trabalho"
                      required=""
                      value={volunteerWork.nameVolunteerWork}
                      onChange={(e) => setVolunteerWork({...volunteerWork, nameVolunteerWork: e.target.value})} 
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <label
                      for="authorBook "
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Endereço do Trabalho
                    </label>
                    <input
                      type="text"
                      name="authorBook "
                      id="authorBook "
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Digite o endereço do trabalho"
                      required=""
                      value={volunteerWork.address}
                      onChange={(e) => setVolunteerWork({...volunteerWork, address: e.target.value})}
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      for="curiosityBook"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Data do trabalho
                    </label>
                    <Calendar
                      className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={volunteerWork.dateVolunteerWork}
                      onChange={(e) =>
                        setVolunteerWork({ ...volunteerWork, dateVolunteerWork: e.value })
                      }
                      showIcon
                      dateFormat="dd/mm/yy"
                    />
                  </div>
                </div>
                <div className="col-span-2 mb-4">
                    <label
                      for="overViewBook"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Descrição do Trabalho voluntário
                    </label>
                    <textarea
                      id="overViewBook"
                      name="overViewBook"
                      value={volunteerWork.work_description}
                      onChange={(e) => setVolunteerWork({...volunteerWork, work_description: e.target.value})}
                      rows="2"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Digite uma descrição para o trabalho"
                    ></textarea>
                  </div>
                <button
                  type="submit"
                  onClick={CreateVolunteerWork}
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
