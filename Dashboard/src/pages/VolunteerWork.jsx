import React, { useEffect, useState } from 'react'
import SearchInput from '../components/SearchInput'
import ModalLectureUpdate from '../components/Lectures/ModalLecturesUpdate'
import ModalLecturesDelete from '../components/Lectures/ModalLecturesDelete'
import { PlusSquare, SquarePen, Trash } from 'lucide-react'
import api from '../services/api'
import ModalVolunteerWorkAdd from "../components/VolunteerWork/ModalWorkVolunteerAdd"

export default function VolunteerWork() {
  const [data, setData] = useState([])
  const token = localStorage.getItem('@Auth:token')

  useEffect(() => {
    ViewVolunteerWork()
  }, [])

  async function ViewVolunteerWork(){
    try {
      const response = await api.get('/VolunteerWork/work', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setData(response.data.data)
    } catch(error){
      if(error.response){
        if(error.response.data.message === "Sessão expirada, por favor, faça login novamente."){
          alert(error.response.data.message)
          localStorage.clear()
          return navigate("/", { replace: true }) // Redireciona para a página de login
        }
      } else {
        alert(`Erro na requisição: `, error.response.data.message)
      }
    }
  }


  return (
    <div className="flex flex-col p-4 gap-5w-full md:ml-64 sm:ml-60 mt-14">
      <div className="pt-5 px-5 flex items-center">
        <h1 className="text-2xl">Trabalhos Voluntários</h1>
        <div className='ml-auto flex gap-3 ps-3'>
          <ModalVolunteerWorkAdd titleButton={'Adicionar Trabalho'} titleModal={'Adicionar trabalho voluntário'} iconButton={<PlusSquare />}  otherStyle="bg-blue-500 text-white h-10 w-43 rounded-lg flex items-center p-2 gap-2 cursor-pointer hover:bg-blue-600"
 />
          <SearchInput />
        </div>
      </div>
      <div className="py-7 px-5">
        <table class="table-auto w-full rounded-lg overflow-hidden border-gray-800">
          <thead className="bg-gray-900 text-white uppercase text-sm">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Nome do trabalho Voluntário</th>
              <th className="px-4 py-3 text-left">Endereço do Trabalho</th>
              <th className="px-4 py-3 text-left">Data do Trabalho</th>
              <th className="px-4 py-3 text-left">Ação</th>
            </tr>
          </thead>
          <tbody className="bg-gray-100 divide-y">
            {data.length > 0 ? 
              data.map((item) => (
                <tr key={item.idVolunteerWork}>
                  <td className="px-4 py-3 text-left">{item.idVolunteerWork}</td>
                  <td className="px-4 py-3 text-left">{item.nameVolunteerWork}</td>
                  <td className="px-4 py-3 text-left">{item.address}</td>
                  <td className="px-4 py-3 text-left">{item.dateVolunteerWork}</td>
                  <td className="px-4 py-3 text-left">
                      <div className='flex gap-2'>
                      <ModalLectureUpdate
                        lectureContent={item}
                        titleButton="Editar"
                        titleModal="Editar"
                        iconButton={<SquarePen />}
                        otherStyle="bg-blue-400 hover:bg-blue-500 p-2 w-25 flex items-center justify-evenly rounded-md cursor-pointer text-white"
                      />
                      <ModalLecturesDelete
                        lectureContent={item}
                        titleButton="Excluir"
                        titleModal="Editar"
                        iconButton={<Trash />}
                        otherStyle="bg-red-400 hover:bg-red-500 p-2 w-25 flex items-center justify-evenly rounded-md cursor-pointer text-white"
                      />
                      </div>
                  </td>
                </tr>
              )) : (
              <tr>
                <td colSpan="4" className="px-4 py-3 text-center">Sem dados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
