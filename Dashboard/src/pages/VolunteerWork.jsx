import React from 'react'
import SearchInput from '../components/SearchInput'
import Modal from '../components/Modal'
import ModalDeleteItem from '../components/ModalDeleteItem'
import { PlusSquare, SquarePen, Trash } from 'lucide-react'

export default function VolunteerWork() {
  return (
    <div className="flex flex-col p-4 gap-5w-full md:ml-64 mt-14">
      <div className="pt-5 px-5 flex items-center">
        <h1 className="text-2xl">Trabalhos Voluntários</h1>
        <div className='ml-auto flex gap-3'>
          <Modal titleButton={'Adicionar Livros'} titleModal={'Adicionar Item'} iconButton={<PlusSquare />} otherStyle="bg-blue-500 text-white h-10 w-43 rounded-lg flex items-center p-2 gap-2 cursor-pointer hover:bg-blue-600" />
          <SearchInput />
        </div>
      </div>
      <div className="py-7 px-5">
        <table class="table-auto w-full rounded-lg overflow-hidden border-gray-800">
          <thead className="bg-gray-900 text-white uppercase text-sm">
            <tr>
              <th className="px-4 py-3 text-left">Song</th>
              <th className="px-4 py-3 text-left">Artist</th>
              <th className="px-4 py-3 text-left">Year</th>
              <th className="px-4 py-3 text-left">Ação</th>
            </tr>
          </thead>
          <tbody className="bg-gray-100 divide-y">
            <tr className="hover:bg-gray-200">
              <td className="px-4 py-3 text-left">
                The Sliding Mr. Bones (Next Stop, Pottersville)
              </td>
              <td className="px-4 py-3 text-left">Malcolm Lockyer</td>
              <td className="px-4 py-3 text-left">1961</td>
              <td className="px-4 py-3 text-left">
                <div className="flex gap-2">
                  <Modal
                    titleButton="Editar"
                    titleModal="Editar"
                    iconButton={<SquarePen />}
                    otherStyle="bg-blue-400 hover:bg-blue-500 p-2 w-25 flex items-center justify-evenly rounded-md cursor-pointer text-white"
                  />
                  <ModalDeleteItem
                    titleButton="Excluir"
                    titleModal="Editar"
                    iconButton={<Trash />}
                    otherStyle="bg-red-400 hover:bg-red-500 p-2 w-25 flex items-center justify-evenly rounded-md cursor-pointer text-white"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
