import React, { useEffect, useState } from "react";
import SearchInput from "../components/SearchInput";

import { PlusSquare, SquarePen, Trash } from "lucide-react";
import ModalDeleteItem from "../components/Books/ModalDeleteItem";
import AddLecturesModal from "../components/Lectures/ModalLecturesAdd";
import UpdateLecturesModal from "../components/Lectures/ModalLecturesAdd";
import api from "../services/api";
import { useNavigate } from "react-router";
import ModalLecturesUpdate from "../components/Lectures/ModalLecturesUpdate";

export default function Lecture() {
  const token = localStorage.getItem("@Auth:token");
  const navigate = useNavigate()
  const [lecture, setLecture] = useState([])

  useEffect(() => {
    if(!token){
      localStorage.clear()
      alert('Sessão expirada. Faça login novamente.')
      navigate('/', {replace: true})
      return
    }

    ViewLecture()
  }, [])

  async function ViewLecture() {
    try {
      const response = await api.get("/lectures/lectures", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLecture(response.data.data)
    } catch (error) {
      console.error('Erro: ', error)
      if(error.response){
        if(error.response.data.message === "Sessão expirada, por favor, faça login novamente."){
          alert(error.response.data.message)
          localStorage.clear()
          navigate('/', {replace: true})
        }
      }
    }
  }

  return (
    <div className="flex flex-col p-4 gap-5w-full md:ml-64 mt-14">
      <div className="pt-5 px-5 flex items-center">
        <h1 className="text-2xl">Palestras</h1>
        <div className="ml-auto flex gap-3">
          <AddLecturesModal
            titleButton={"Adicionar Livros"}
            titleModal={"Adicionar Item"}
            iconButton={<PlusSquare />}
            otherStyle="bg-blue-500 text-white h-10 w-43 rounded-lg flex items-center p-2 gap-2 cursor-pointer hover:bg-blue-600"
          />
          <SearchInput />
        </div>
      </div>
      <div className="py-7 px-5">
        <table class="table-auto w-full rounded-lg overflow-hidden border-gray-800">
          <thead className="bg-gray-900 text-white uppercase text-sm">
            <tr>
            <th className="px-4 py-3 text-left">Id da palestra</th>
              <th className="px-4 py-3 text-left">Nome da Palestra</th>
              <th className="px-4 py-3 text-left">Descrição</th>
              <th className="px-4 py-3 text-left">Data da Palestra</th>
              <th className="px-4 py-3 text-left">Link da palestra</th>
              <th className="px-4 py-3 text-left">Horario da Palestra</th>
              <th className="px-4 py-3 text-left">Link do Vídeo</th>
              <th className="px-4 py-3 text-left">Ação</th>
            </tr>
          </thead>
          <tbody className="bg-gray-100 divide-y">
            {lecture.length > 0 ? (
              lecture.map((content) => (
                <tr key={content.idLecture} className="hover:bg-gray-200">
                  <td className="px-4 py-3 text-left">
                    {content.idLecture}
                  </td>
                  <td className="px-4 py-3 text-left">
                    {content.nameLecture}
                  </td>
                  <td className="px-4 py-3 text-left">{content.description}</td>
                  <td className="px-4 py-3 text-left">{content.dateLecture}</td>
                  <td className="px-4 py-3 text-left">{content.link_url}</td>
                  <td className="px-4 py-3 text-left">{content.timeLecture}</td>
                  <td className="px-4 py-3 text-left">{content.video_url}</td>
                  <td className="px-4 py-3 text-left">
                    <div className="flex gap-2">
                      <ModalLecturesUpdate
                        lectureContent={content}
                        titleButton="Editar"
                        titleModal="Editar"
                        iconButton={<SquarePen />}
                        otherStyle="bg-blue-400 hover:bg-blue-500 p-2 w-25 flex items-center justify-evenly rounded-md cursor-pointer text-white"
                      />
                      <ModalDeleteItem
                        lectureContent={content}
                        titleButton="Excluir"
                        titleModal="Editar"
                        iconButton={<Trash />}
                        otherStyle="bg-red-400 hover:bg-red-500 p-2 w-25 flex items-center justify-evenly rounded-md cursor-pointer text-white"
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-4 text-gray-500 text-center">
                  <div className="flex justify-center items-center">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
