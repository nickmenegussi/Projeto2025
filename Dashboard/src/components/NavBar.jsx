import React, { useState } from 'react'
import azar from '../assets/azar.png'
import { Link } from 'react-router-dom'
import { Bell, Moon, Sun, SunMoon } from 'lucide-react';
import Breadcrumbs from './Breadcrumbs';

function navbar() {
  const [Open, setOpen] = useState(false)
  const [SwapColor, setSwapColor] = useState(false)
  const [BlackTheme, setBlackTheme] = useState(false)

  return (
    <>
      <div className='h-16 w-full flex items-center '>
        <h3 className='text-2xl p-5 font-medium text-start' >Painel Adiministrativo</h3>
        <div className='flex items-center gap-4 ml-auto right-0'>
          <div>
            <Bell />
          </div>
          <div>
            <button className='cursor-pointer' onClick={() => setSwapColor(!SwapColor)} onBlur={() => setSwapColor(false)}><SunMoon size={25} /></button> 
            {SwapColor && (
              <div className='bg-white shadow-md absolute top-14 right-15 p-2 flex flex-col rounded-md justify-between gap-1'>
                <div className='px-4 py-2 rounded-md bg-white hover:bg-gray-100 transition duration-300 flex cursor-pointer gap-x-2'>
                  <Moon/>
                  <Link>Escuro</Link>
                </div>
                <div className='px-4 py-2 rounded-md bg-white hover:bg-gray-100 transition duration-300 flex gap-x-2 cursor-pointer'>
                  <Sun/>
                  <Link>Claro</Link>
                </div>
              </div>
            )}
          </div>
          <div>
            <button className='cursor-pointer static' onClick={() => setOpen(!Open)} onBlur={() => setOpen(false)}>
              <img className='h-10 w-10 shrink-0 rounded-full mr-5' src={azar} alt="..." />
            </button>  
            {Open && (
              <div className='bg-white shadow-md absolute top-14 right-5 p-2 flex flex-col rounded-md justify-between gap-1'>
                <Link className='px-4 py-2 rounded-md bg-white hover:bg-blue-500 hover:text-white transition duration-300'>Perfil</Link>
                <Link className='px-4 py-2 rounded-md bg-white hover:bg-red-500 hover:text-white transition duration-300'>Sair</Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='bg-white shadow border-t border-gray-300'>
        <Breadcrumbs />
      </div>
    </>
  )
}

export default navbar