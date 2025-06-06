import React, { useState } from "react"
import api from "../../services/api"
import { Navigate, useNavigate } from "react-router"

export default function ModalAddForum({
  titleModal,
  titleButton,
  iconButton,
  otherStyle,
  onUpdate
}) {
  const [OpenModal, setOpenModal] = useState(false)
  const navigate = useNavigate()

  const [forum, setForum] = useState({
    content: "",
    image: null,
    User_idUser: JSON.parse(localStorage.getItem("@Auth:user"))?.idUser || 0,
    Topic_idTopic: "",
  })
  const token = localStorage.getItem("@Auth:token")

  async function CreatePost(event) {
    event.preventDefault()

    try {
      const { content, image ,User_idUser, Topic_idTopic } = forum

      const formData = new FormData()
      formData.append("content", content)
      if(image){
        formData.append('image', image)
      }
      formData.append("User_idUser", User_idUser)
      formData.append("Topic_idTopic", parseInt(Topic_idTopic))

      const response = await api.post(
        "/post/post/register",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      )
      alert(response.data.message)
      setOpenModal(false)
      onUpdate()
    } catch (error) {
      alert(`Erro: ${error}`)
      if (error.response) {
        if (
          error.response.data.loginRequired
        ) {
          alert(error.response.data.message)
          localStorage.clear()
          return <Navigate to={'/'}/>
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
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <form className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      for="TopicId "
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Id do Tópico
                    </label>
                    <input
                      type="text"
                      name="TopicId"
                      value={forum.Topic_idTopic}
                      onChange={(e) =>
                        setForum({
                          ...forum,
                          Topic_idTopic: parseInt(e.target.value),
                        })
                      }
                      id="TopicId "
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Digite o id do Tópico Respectivo"
                      required=""
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="PostImage"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Imagem do Post
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      name="image"
                      onChange={(e) =>
                        setForum({ ...forum, image: e.target.files[0]})
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      for="PostContent"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Conteúdo do Post
                    </label>
                    <textarea
                      type="text"
                      name="PostContent"
                      value={forum.content}
                      onChange={(e) =>
                        setForum({ ...forum, content: e.target.value })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Digite o Conteúdo do Post"
                      required=""
                    ></textarea>
                  </div>
                </div>
                <button
                  onClick={CreatePost}
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
                      fill-rule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Add new product
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
