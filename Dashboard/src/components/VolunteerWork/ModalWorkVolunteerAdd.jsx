import React, { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router";
import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function ModalWorkVolunteerAdd({ titleModal, titleButton, iconButton, otherStyle }) {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [volunteerWork, setVolunteerWork] = useState({
    nameVolunteerWork: "",
    address: "",
    dateVolunteerWork: "",
    work_description: "",
  });

  const token = localStorage.getItem('@Auth:token');

  function formatDateForSQL(date) {
    if (!date) return null;
    return new Date(date).toISOString().split("T")[0]; // Formato 'YYYY-MM-DD'
  }

  async function CreateVolunteerWork(event) {
    event.preventDefault();
    console.log("Dados antes da requisição:", volunteerWork);

    const { nameVolunteerWork, address, dateVolunteerWork, work_description } = volunteerWork;

    try {
      const response = await api.post(
        "/VolunteerWork/work/create",
        {
          nameVolunteerWork,
          address,
          dateVolunteerWork: formatDateForSQL(dateVolunteerWork),
          work_description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
      setOpenModal(false)
    } catch (error) {
      console.error("Erro na requisição:", error);
      if (error.response.data.message === "Sessão expirada, por favor, faça login novamente.") {
        localStorage.clear();
        navigate("/", { replace: true })
      } else {
        alert(error.response.data.message)
      }
    }
  }

  return (
    <>
      <button onClick={() => setOpenModal(!openModal)} className={otherStyle} type="button">
        {iconButton} {titleButton}
      </button>

      {openModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{titleModal}</h3>
                <button
                  onClick={() => setOpenModal(false)}
                  className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600"
                >
                  &times;
                </button>
              </div>

              <form className="p-4 md:p-5" onSubmit={CreateVolunteerWork}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome do trabalho</label>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full"
                      placeholder="Digite o nome do trabalho"
                      required
                      value={volunteerWork.nameVolunteerWork}
                      onChange={(e) => setVolunteerWork({ ...volunteerWork, nameVolunteerWork: e.target.value })}
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Endereço</label>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full"
                      placeholder="Digite o endereço"
                      required
                      value={volunteerWork.address}
                      onChange={(e) => setVolunteerWork({ ...volunteerWork, address: e.target.value })}
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data</label>
                    <Calendar
                      value={volunteerWork.dateVolunteerWork}
                      onChange={(e) => setVolunteerWork({ ...volunteerWork, dateVolunteerWork: e.value })}
                      showIcon
                      dateFormat="dd/mm/yy"
                      className="border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full"
                    />
                  </div>
                </div>

                <div className="col-span-2 mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição</label>
                  <textarea
                    rows="2"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full"
                    placeholder="Digite uma descrição"
                    value={volunteerWork.work_description}
                    onChange={(e) => setVolunteerWork({ ...volunteerWork, work_description: e.target.value })}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 w-full"
                >
                  Adicionar trabalho
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
