import React, { useEffect, useState } from 'react'
import SearchInput from '../components/SearchInput'

import { PlusSquare, SquarePen, Trash } from 'lucide-react'
import Modal from '../components/Books/ModalBibliotecaAdd'
import ModalDeleteItem from '../components/Books/ModalDeleteItem'
import ModalUpdateAdd from '../components/notifications/ModalAddNotifications'
import api from '../services/api'
import ModalUpdateNotification from '../components/notifications/ModalUpdateNotifications'
import ModalDeleteNotification from '../components/notifications/ModalDeleteNotifications'

export default function Notifications() {
  const [notification, setNotification] = useState([])
  const token = localStorage.getItem("@Auth:token")

  useEffect(() => {
    ViewNotification()
  }, [])

  async function ViewNotification(){
    try {
      const response = await api.get('/notifications/notifications',{
        headers: { Authorization: `Bearer ${token}` },
      })
      setNotification(response.data.data)
    } catch (error) {
      if(error.response){
        if(error.response.data.message === "Sessão expirada, por favor, faça login novamente."){
          alert(error.response.data.message)
          localStorage.clear()
          return navigate("/", { replace: true }) // Redireciona para a página de login
        } else {
          alert(`Erro na requisição: `, error.response.data.message)
        }
      } else {
        alert(`Erro: `, error)
      }
    }
  }



  return (
    <div className="flex flex-col p-4 gap-5w-full md:ml-64 sm:ml-60 mt-14">
      <div className="pt-5 px-5 flex items-center">
        <h1 className="text-2xl">Notificações</h1>
        <div className='ml-auto flex gap-3 ps-3'>
          <ModalUpdateAdd titleButton={'Adicionar notificação'} titleModal={'Adicionar notificação'} iconButton={<PlusSquare />} otherStyle="bg-blue-500 text-white h-10 w-53 rounded-lg flex items-center p-2 gap-2 cursor-pointer hover:bg-blue-600" />
          <SearchInput />
        </div>
      </div>
      <div className="py-7 px-5">
        <table class="table-auto w-full rounded-lg overflow-hidden border-gray-800">
          <thead className="bg-gray-900 text-white uppercase text-sm">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Mensagem</th>
              <th className="px-4 py-3 text-left">Status da Leitura</th>
              <th className="px-4 py-3 text-left">Criador</th>
              <th className="px-4 py-3 text-left">Ação</th>
            </tr>
          </thead>
          <tbody className="bg-gray-100 divide-y">
            {notification.length > 0 ? (
              notification.map((item) => (
                <tr className="hover:bg-gray-200">
              <td className="px-4 py-3 text-left">
                {item.idNotifications}
              </td>
              <td className="px-4 py-3 text-left">{item.message}</td>
              <td className="px-4 py-3 text-left">
                {item.isRead === 0 ? <td className='py-3 text-left'>Mensagem não lida</td> : item.isRead === 1 ? <td>Mensagem Lida</td> : "não possui valor algum"}</td>
              <td className="px-4 py-3 text-left">{item.User_idUser}</td>
              <td className="px-4 py-3 text-left">
                <div className="flex gap-2">
                  <ModalUpdateNotification
                    titleButton="Editar"
                    titleModal="Editar"
                    iconButton={<SquarePen />}
                    notificationContent={notification}
                    onUpdate={ViewNotification}
                    otherStyle="bg-blue-400 hover:bg-blue-500 p-2 w-25 flex items-center justify-evenly rounded-md cursor-pointer text-white"
                  />
                  <ModalDeleteNotification
                    titleButton="Excluir"
                    titleModal="Editar"
                    iconButton={<Trash />}
                    notificationContent={notification}
                    otherStyle="bg-red-400 hover:bg-red-500 p-2 w-25 flex items-center justify-evenly rounded-md cursor-pointer text-white"
                    onUpdate={ViewNotification}
                  />
                </div>
              </td>
            </tr>
              ))
            ): ( 
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
