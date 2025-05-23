import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../../services/api";

export default function ModalLecturesUpdate({
  titleModal,
  titleButton,
  iconButton,
  otherStyle,
  lectureContent,
}) {
  const [OpenModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [lecture, setLecture] = useState(lectureContent);
  const [selectField, setSelectField] = useState("");
  const token = localStorage.getItem("@Auth:token");


  async function UpdateLecture(idLecture, field, value) {
    try {
      const response = await api.patch(
        `/lectures/lectures/${idLecture}/${field}`,
        {
          [field]: value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      if (
        error.response &&
        error.response.data.message ===
          "Sessão expirada, por favor, faça login novamente."
      ) {
        localStorage.clear();
        alert(error.response.data.message);
        navigate("/", { replace: true });
      } else {
        alert(`Erro na requisição: ${error.response.data.message}`);
      }
    }
  }

  const handleSubmit = () => {
    if (selectField) {
      UpdateLecture(lecture.idLecture, selectField, lecture[selectField]);
    } else {
      alert("Por favor, selecione um campo para atualizar.");
    }
  };

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
                      <option value="nameLecture">Nome da Palestra</option>
                      <option value="description">Descrição da palestra</option>
                      <option value="dateLecture">Data da palestra</option>
                      <option value="timeLecture">Horário da Palestra</option>
                      <option value="link_url">
                        O link de compartilhamento
                      </option>
                      <option value="video_url">Vídeo da palestra</option>
                    </select>
                  </div>

                  <div className="col-span-2 flex flex-col gap-6">
                    {selectField === "nameLecture" && (
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Nome da Palestra
                        </label>
                        <input
                          type="text"
                          value={lecture[selectField]}
                          onChange={(e) =>
                            setLecture({
                              ...lecture,
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
                          Descrição da palestra
                        </label>
                        <textarea
                          rows="2"
                          value={lecture[selectField]}
                          onChange={(e) =>
                            setLecture({
                              ...lecture,
                              [selectField]: e.target.value,
                            })
                          }
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Digite a descrição da palestra"
                        ></textarea>
                      </div>
                    )}

                    {selectField === "dateLecture" && (
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Data da palestra
                        </label>
                        <input
                          type="date"
                          value={lecture[selectField]}
                          onChange={(e) =>
                            setLecture({
                              ...lecture,
                              [selectField]: e.target.value,
                            })
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          required
                        />
                      </div>
                    )}

                    {selectField === "timeLecture" && (
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Horário da Palestra
                        </label>
                        <input
                          type="time"
                          value={lecture[selectField]}
                          onChange={(e) =>
                            setLecture({
                              ...lecture,
                              [selectField]: e.target.value,
                            })
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          required
                        />
                      </div>
                    )}

                    {selectField === "link_url" && (
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Link de compartilhamento
                        </label>
                        <input
                          type="url"
                          value={lecture[selectField]}
                          onChange={(e) =>
                            setLecture({
                              ...lecture,
                              [selectField]: e.target.value,
                            })
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Digite o link de compartilhamento"
                          required
                        />
                      </div>
                    )}

                    {selectField === "video_url" && (
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Vídeo da palestra
                        </label>
                        <input
                          type="url"
                          value={lecture[selectField]}
                          onChange={(e) =>
                            setLecture({
                              ...lecture,
                              [selectField]: e.target.value,
                            })
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Digite o link do vídeo da palestra"
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
                      fill-rule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clip-rule="evenodd"
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
  );
}
