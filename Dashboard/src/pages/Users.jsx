import React, { useEffect, useState } from 'react'
import SearchInput from '../components/SearchInput'
import { PlusSquare, SquarePen, Trash } from 'lucide-react'
import Modal from '../components/Books/ModalBibliotecaAdd'
import ModalDeleteItem from '../components/Books/ModalDeleteItem'
import ModalUserAdd from '../components/Users/ModalUsersAdd'
import ModalUserUpdate from '../components/Users/ModalUserUpdate'
import api from '../services/api'
import { useNavigate } from 'react-router'


export default function Users() {
  const [user, setUser] = useState([])
  const token = localStorage.getItem('@Auth:token')
  const roleUserLoged = JSON.parse(localStorage.getItem('@Auth:user'))
  const navigate = useNavigate()


  useEffect(() => {
    ViewUser()
  }, [])
  async function ViewUser(){
    try {
      const response = await api.get('/user/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUser(response.data.data)
    } catch (error) {
      if (error.response) {
        if (error.response.data.message === 'Sessão expirada, por favor, faça login novamente.') {
          alert(error.response.data.message)
          localStorage.clear()
          return navigate('/', {replace: true})
        }
      } else {
        console.error('Erro na requisição:', error)
      }
    }
  }


  return (
    <div className="flex flex-col p-4 gap-5w-full md:ml-64 sm:ml-60 mt-14">
      <div className="pt-5 px-5 flex items-center">
        <h1 className="text-2xl">Usuários</h1>
        <div className='ml-auto flex gap-3'>
          <SearchInput />
        </div>
      </div>
      <div className="py-7 px-5">
        <table class="table-auto w-full rounded-lg overflow-hidden border-gray-800">
          <thead className="bg-gray-900 text-white uppercase text-sm">
            <tr>
              <th className="px-4 py-3 text-left">Id</th>
              <th className="px-4 py-3 text-left">Nome do Usuario</th>
              <th className="px-4 py-3 text-left">email do usuario</th>
              <th className="px-4 py-3 text-left">foto de perfil</th>
              <th className="px-4 py-3 text-left">status permissão</th>
              <th className="px-4 py-3 text-left">Data de criação</th>
              <th className="px-4 py-3 text-left">Ação</th>
            </tr>
          </thead>
          <tbody className="bg-gray-100 divide-y">
            {user.length > 0 ? (
              user.map((userItem) => (
                <tr className="hover:bg-gray-200">
              <td className="px-4 py-3 text-left">
                {userItem.idUser}
              </td>
              <td className="px-4 py-3 text-left">{userItem.nameUser}</td>
              <td className="px-4 py-3 text-left">{userItem.email}</td>
              <td className="px-4 py-3 text-left">{userItem.image_profile}</td>
              <td className="px-4 py-3 text-left">{userItem.status_permission}</td>
              <td className="px-4 py-3 text-left">{userItem.date_at_create}</td>
              <td className="px-4 py-3 text-left">
                <div className="flex gap-2">
                  {roleUserLoged.status_permission === 'SuperAdmin' && (
                    <ModalUserUpdate
                    userContent={userItem}
                    titleButton="Editar"
                    titleModal="Editar"
                    iconButton={<SquarePen />}
                    otherStyle="bg-blue-400 hover:bg-blue-500 p-2 w-25 flex items-center justify-evenly rounded-md cursor-pointer text-white"
                    onUpdate={ViewUser}
                  />
                  )}
                  <ModalDeleteItem
                    titleButton="Excluir"
                    titleModal="Editar"
                    iconButton={<Trash />}
                    otherStyle="bg-red-400 hover:bg-red-500 p-2 w-25 flex items-center justify-evenly rounded-md cursor-pointer text-white"
                    onUpdate={ViewUser}
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
  )
}
