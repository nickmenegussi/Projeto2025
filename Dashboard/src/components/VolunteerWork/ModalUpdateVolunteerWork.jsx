import React, { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router";
import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function ModalUpdateVolunteerWork({
  titleModal,
  content,
  titleButton,
  iconButton,
  otherStyle,
  onUpdate,
}) {
  const [OpenModal, setOpenModal] = useState(false);
  const [contentVolunteer, setContentVolunteer] = useState(content);
  const [selectField, setSelectField] = useState("");
  const navigate = useNavigate();
  const [volunteerWork, setVolunteerWork] = useState({
    nameVolunteerWork: "",
    address: false,
    dateVolunteerWork: "",
    timeVolunteerWork: "",
    work_description: "",
  });

  function formateTimeForSql(date) {
    if (!date) return null;
    const localDate = new Date(date);
    const hours = String(localDate.getHours()).padStart(2, "0");
    const minutes = String(localDate.getMinutes()).padStart(2, "0");
    const seconds = String(localDate.getSeconds()).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  }

  const token = localStorage.getItem("@Auth:token");
  async function UpdateVolunteerWork(idVolunteerWork, field, value) {
    try {
      const response = await api.patch(
        `/VolunteerWork/work/${idVolunteerWork}/${field}`,
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
      setOpenModal(false);
      onUpdate();
    } catch (error) {
      if (error.response) {
        if (
          error.response.data.message ===
          "Sessão expirada, por favor, faça login novamente."
        ) {
          alert(error.response.data.message);
          localStorage.clear();
          return navigate("/", { replace: true }); // Redireciona para a página de login
        } else {
          alert(error.response.data.message);
        }
      } else {
        alert(`Erro na requisição: ${error.message}`);
      }
    }
  }

  const handleConfirm = (event) => {
    event.preventDefault();
    if (selectField) {
      if(selectField === 'timeVolunteerWork'){
        UpdateVolunteerWork(
          parseInt(contentVolunteer.idVolunteerWork),
          selectField,
          formateTimeForSql(volunteerWork[selectField])
        );
      } else {
        UpdateVolunteerWork(
          parseInt(contentVolunteer.idVolunteerWork),
          selectField,
          volunteerWork[selectField]
        );
      }
    } else {
      alert("Por favor, selecione um campo para atualizar.");
    }
  };

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

              <form className="p-4 md:p-5" onSubmit={handleConfirm}>
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
                      <option value="nameVolunteerWork">
                        Nome do Trabalho
                      </option>
                      <option value="address">Endereço do Trabalho</option>
                      <option value="dateVolunteerWork">
                        Data do Trabalho
                      </option>
                      <option value="timeVolunteerWork">
                        Data do Trabalho
                      </option>
                      <option value="work_description">
                        Descrição do trabalho
                      </option>
                    </select>
                  </div>

                  {selectField === "nameVolunteerWork" && (
                    <div className="col-span-2">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Nome do trabalho
                      </label>
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full"
                        placeholder="Digite o nome do trabalho"
                        required
                        value={volunteerWork.nameVolunteerWork}
                        onChange={(e) =>
                          setVolunteerWork({
                            ...volunteerWork,
                            nameVolunteerWork: e.target.value,
                          })
                        }
                      />
                    </div>
                  )}
                  {selectField === "address" && (
                    <div className="col-span-2">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Endereço
                      </label>
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full"
                        placeholder="Digite o endereço"
                        required
                        value={volunteerWork.address}
                        onChange={(e) =>
                          setVolunteerWork({
                            ...volunteerWork,
                            address: e.target.value,
                          })
                        }
                      />
                    </div>
                  )}
                  {selectField === "dateVolunteerWork" && (
                    <div className="col-span-2">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Data
                      </label>
                      <Calendar
                        value={volunteerWork.dateVolunteerWork}
                        onChange={(e) =>
                          setVolunteerWork({
                            ...volunteerWork,
                            dateVolunteerWork: e.value,
                          })
                        }
                        showIcon
                        dateFormat="dd/mm/yy"
                        className="border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full"
                      />
                    </div>
                  )}
                  {selectField === "work_description" && (
                    <div className="col-span-2 mb-4">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Descrição
                      </label>
                      <textarea
                        rows="2"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full"
                        placeholder="Digite uma descrição"
                        value={volunteerWork.work_description}
                        onChange={(e) =>
                          setVolunteerWork({
                            ...volunteerWork,
                            work_description: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>
                  )}
                  {selectField === "timeVolunteerWork" && (
                    <div className="col-span-2 mb-4">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Horário do Trabalho
                      </label>
                      <Calendar
                        timeOnly
                        showIcon
                        showTime
                        hourFormat="24"
                        value={volunteerWork.timeVolunteerWork}
                        onChange={(e) =>
                          setVolunteerWork({
                            ...volunteerWork,
                            timeVolunteerWork: e.value,
                          })
                        }
                        className="border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full"
                      />
                    </div>
                  )}
                  <button
                    type="submit"
                    className="text-white cursor-pointer inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Alterar Notificações
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
