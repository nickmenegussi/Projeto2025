import React, { useState } from "react"
import api from "../../services/api"

export default function ModalUpdate({
  titleModal,
  titleButton,
  iconButton,
  otherStyle,
  bookContent,
  key,
}) {
  const [OpenModal, setOpenModal] = useState(false)
  const [selectedField, setSelectField] = useState("")
  const [book, setBook] = useState(bookContent)
  const token = localStorage.getItem("@Auth:token")


  async function UpdateBook(LibraryId, field, value) {
    try {
      console.log(value)
      const response = await api.patch(
        `/library/library/${LibraryId}/${field}`,
        {
          [field]: value,
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      console.log(response)
      alert(response.data.message)
    } catch (error) {
      if (error.response) {
        alert(`Erro: ${error.response.data.message}`)
      }
    }
  }

  const handleConfirm = () => {
    if (selectedField) {
      UpdateBook(book.idLibrary, selectedField, book[selectedField])
      console.log(book[selectedField])
    } else {
      alert("Por favor, selecione um campo para atualizar.")
    }
  }

  return (
    <>
      <button
        onClick={() => setOpenModal(!OpenModal)}
        className={otherStyle}
        type="button"
      >
        {iconButton} {titleButton}
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
                  <span className="sr-only">Fechar modal</span>
                </button>
              </div>

              <form className="p-4 md:p-5">
                <div className="grid gap-6 mb-6 grid-cols-2">
                  <div className="col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Qual item você deseja mudar?
                    </label>
                    <select
                      value={selectedField}
                      onChange={(e) => setSelectField(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    >
                      <option value="">Selecionar um item</option>
                      <option value="nameBook">Nome do Livro</option>
                      <option value="tagsBook">Categoria</option>
                      <option value="authorBook">Autor</option>
                      <option value="bookQuantity">Quantidade</option>
                      <option value="overviewBook">Visão Geral</option>
                      <option value="curiosityBook">Curiosidade</option>
                    </select>
                  </div>

                  <div className="col-span-2 flex flex-col gap-6">
                    {selectedField === "nameBook" && (
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Nome do Livro
                        </label>
                        <input
                          type="text"
                          value={book[selectedField]}
                          onChange={(e) =>
                            setBook({ ...book, [selectedField]: e.target.value })
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          required
                        />
                      </div>
                    )}

                    {selectedField === "tagsBook" && (
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Categoria dos Livros
                        </label>
                        <select
                        // aqui no book[selectField], seria a mesma coisa book.tagsBook
                          value={book[selectedField]}
                          onChange={(e) =>
                            setBook({ ...book, [selectedField]: e.target.value })
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        >
                          <option value="">Selecionar categoria</option>
                          <option value="Obras Básicas">Obras Básicas</option>
                          <option value={"Obras Complementares"}>Obras Complementares</option>
                        </select>
                      </div>
                    )}

                    {selectedField === "authorBook" && (
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Autor do Livro
                        </label>
                        <input
                          type="text"
                          value={book[selectedField]}
                          onChange={(e) =>
                            setBook({ ...book, [selectedField]: e.target.value })
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          required
                        />
                      </div>
                    )}

                    {selectedField === "bookQuantity" && (
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Quantidade de Livros
                        </label>
                        <input
                          type="text"
                          value={book[selectedField]}
                          onChange={(e) =>
                            setBook({ ...book, [selectedField]: e.target.value })
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Digite a quantidade de livros"
                          required
                        />
                      </div>
                    )}

                    {selectedField === "overviewBook" && (
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Visão geral sobre o Livro
                        </label>
                        <textarea
                          rows="2"
                          value={book[selectedField]}
                          onChange={(e) =>
                            setBook({ ...book, [selectedField]: e.target.value })
                          }
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Digite a visão geral do livro aqui"
                        ></textarea>
                      </div>
                    )}

                    {selectedField === "curiosityBook" && (
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Curiosidades do Livro
                        </label>
                        <textarea
                          rows="2"
                          value={book[selectedField]}
                          onChange={(e) =>
                            setBook({ ...book, [selectedField]: e.target.value })
                          }
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Digite a curiosidade do livro aqui"
                        ></textarea>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleConfirm}
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
                  Confirmar mudanças
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
