import React, { useState } from "react"
import api from "../../services/api"
import { useNavigate } from "react-router"

export default function ModalUserAdd({titleModal, titleButton ,iconButton, otherStyle }) {
  const [OpenModal, setOpenModal] = useState(false)
  const navigate = useNavigate()
  const [user, setUser] = useState({
    nameUser: "",
    email : "",
    image_profile: "",
    status_permissao: ""
  })

  const token = localStorage.getItem('@Auth:token')
  if (!token){
    localStorage.clear()
    alert("Sessão expirada. Faça login novamente.")
    return navigate('/', { replace: true })
  }

  async function CreateBook(event){
    event.preventDefault()
    const { namebook, authorBook , overviewBook, curiosityBook, tagsBook, bookQuantity ,status_Available } = book // Pegue os valores diretamente do state

    try {
      const response = await api.post('/user/user/register',{
        namebook: namebook, // Envie os dados com os nomes esperados no backend
        authorBook : authorBook ,
        overviewBook: overviewBook,
        curiosityBook: curiosityBook,
        tagsBook: tagsBook,
        bookQuantity: parseInt(bookQuantity),
        status_Available: status_Available
      }, {
        
        headers: {
           Authorizationization: `Bearer ${token}`
        }
      })
      alert(response.data.message)
    } catch (error) {
      if(error.response){
        if(error.response.data.message === "Sessão expirada, por favor, faça login novamente."){
          alert(error.response.data.message)
          localStorage.clear()
          navigate("/", { replace: true }) // Redireciona para a página de login
        }
      } else {
        alert(`Erro na requisição: `, error)
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
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      for="namebook"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Nome do Livro
                    </label>
                    <input
                      type="text"
                      name="namebook"
                      value={book.namebook}
                      onChange={(e) => setBook({...book, namebook: e.target.value})}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type product name"
                      required=""
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      for="category"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Categoria dos Livros
                    </label>
                    <select
                      value={book.tagsBook} onChange={(e) => setBook({...book, tagsBook: e.target.value})}
                      id="category"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option selected="">Selecionar categoria</option>
                      <option value={'Obras Básicas'}>Obras Básicas</option>
                      <option value={'Obras complementares'}>Obras complementares</option>
                    </select>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      for="authorBook "
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Autor do Livro
                    </label>
                    <input
                      type="text"
                      name="authorBook "
                      value={book.authorBook }
                      onChange={(e) => setBook({...book, authorBook : e.target.value})}
                      id="authorBook "
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Digite o autor do livro"
                      required=""
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      for="status_Available"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Disponibilidade do Livro
                    </label>
                    <select
                      value={book.status_Available} onChange={(e) => setBook({...book, status_Available: e.target.value})}
                      id="status_Available"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option selected="">Selecionar disponibilidade</option>
                      <option>reservado</option>
                      <option>disponível</option>
                      <option>emprestado</option>
                      <option>indisponível</option>
                    </select>
                  </div>
                  <div className="col-span-2 sm:col-span-2">
                    <label
                      for="authorBook "
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Quantidade de Livros
                    </label>
                    <input
                      type="text"
                      name="authorBook "
                      value={book.bookQuantity}
                      onChange={(e) => setBook({...book, bookQuantity: e.target.value})}
                      id="authorBook "
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Digite a quantidde de livros"
                      required=""
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      for="overViewBook"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Visão geral sobre o Livro
                    </label>
                    <textarea
                      id="overViewBook"
                      rows="2"
                      value={book.overviewBook}
                      onChange={(e) => setBook({...book, overviewBook: e.target.value})}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Digite a visão geral do livro aqui"
                    ></textarea>
                  </div>
                  <div className="col-span-2">
                    <label
                      for="curiosityBook"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Curiosidades do Livro
                    </label>
                    <textarea
                      id="curiosityBook"
                      rows="2"
                      value={book.curiosityBook}
                      onChange={(e) => setBook({...book, curiosityBook: e.target.value})}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Digite a curiosidade do livro aqui"
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  onClick={CreateBook}
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
