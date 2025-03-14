import React, { useState } from "react"
import api from "../../services/api"
import { useNavigate } from "react-router"

export default function ModalUpdateForum({titleModal, forumContent ,titleButton ,iconButton, otherStyle }) {
  const [OpenModal, setOpenModal] = useState(false)
  const [content, setContent] = useState(forumContent)
  const [selectField, setSelectField] = useState("")
  const navigate = useNavigate()
  const [forum, setForum] = useState({
    content: "",
    User_idUser: JSON.parse(localStorage.getItem('@Auth:user')).idUser,
    Topic_idTopic: 0
  })
  const token = localStorage.getItem('@Auth:token')

  async function UpdateForum(idForum ,field, value){
    try {
      const { content , User_idUser, Topic_idTopic } = forum // pegar os valores diretamente do state

      const response = await api.post(`/post/post/${idForum}/${field}`, {
        [field]: value
      },{
        headers: {
           Authorization: `Bearer ${token}`,
           'Content-Type': 'application/json'
        }
      })
      alert(response.data.message)
    } catch (error) {
      if (error.response) {
        if (error.response.data.message === "Sessão expirada, por favor, faça login novamente.") {
          alert(error.response.data.message)
          localStorage.clear()
          navigate("/", { replace: true }) // Redireciona para a página de login
        }
      } else {
        alert(`Erro na requisição: ${error.message}`)
      }
    }
  }

  const handleConfirm = () => {
    if(selectField){
        UpdateForum(forum.idForum, selectField, forum[selectField])
    } else {
        alert("Por favor, selecione um campo para atualizar.")
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
          tabIndex="-1"
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <form className="p-4 md:p-5" onSubmit={CreatePost}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Qual item você deseja mudar?
                    </label>
                    <select
                      value={selectField}
                      onChange={(e) => setSelectField(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    >
                      <option value="">Selecionar um item</option>
                      <option value="Topic_idTopic">Id do Topico</option>
                      <option value="content">Conteúdo </option>
                    </select>
                  </div>         
                  
                  {selectField === "content" && (
                    <div className="col-span-2">
                      <label
                        htmlFor="PostContent"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Conteúdo do Post
                      </label>
                      <textarea
                        type="text"
                        name="PostContent"
                        value={forum.content}
                        onChange={(e) => setForum({...forum, content: e.target.value})}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Digite o Conteúdo do Post"
                        required=""
                      ></textarea>
                    </div>
                  )}

                  {selectField === "Topic_idTopic" && (
                    <div className="col-span-2">
                      <label
                        htmlFor="TopicId"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Id do Tópico
                      </label>
                      <input
                        type="number"
                        name="TopicId"
                        value={forum.Topic_idTopic}
                        onChange={(e) => setForum({...forum, Topic_idTopic: e.target.value})}
                        id="TopicId"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Digite o id do Tópico Respectivo"
                        required=""
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    className="text-white cursor-pointer inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <svg
                      className="me-1 -ms-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Add new product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
