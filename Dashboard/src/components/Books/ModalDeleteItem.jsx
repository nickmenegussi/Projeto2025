import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function ModalDeleteItem({titleButton,iconButton, otherStyle, bookContent, onUpdate }) {
    const [OpenModal, setOpenModal] = useState(false);
    const [book, setBook] = useState(bookContent)
    const token = localStorage.getItem("@Auth:token")

    
    async function RemoveItem(LibraryId){
      try {
        const response = await api.delete(`/library/library/${bookContent.idLibrary}/delete`,{
          LibraryId,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        alert(response.data.message)
        setOpenModal(false)
        onUpdate()
      } catch (error) {
        if(error.response){
          alert(`Erro: ${error.response.data.message}`)
        }
      }
    }

    return (
    <>
      <button
        onClick={() => setOpenModal(!OpenModal)}
        data-modal-target="popup-modal"
        data-modal-toggle="popup-modal"
        className={otherStyle}
        type="button"
      >
        {[iconButton,titleButton]}
      </button>

        {OpenModal && (
            <div
            id="popup-modal"
            tabindex="-1"
            className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-opacity-60"
            >
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <button
                  onClick={() => setOpenModal(false)}
                  type="button"
                  className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="popup-modal"
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
                <div className="p-4 md:p-5 text-center">
                  <svg
                    className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Você tem certeza que quer remover esse item?
                  </h3>
                  <button
                    onClick={RemoveItem}
                    data-modal-hide="popup-modal"
                    type="button"
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  >
                    Sim, eu tenho
                  </button>
                  <button
                    onClick={() => setOpenModal(false)}
                    data-modal-hide="popup-modal"
                    type="button"
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      
    </>
  );
}
