import React from 'react'

export default function Card({title, content, icon}) {
  return (
    <div className="bg-white p-4 shadow-md shadow-blue-500 rounded-lg">
        <h1 className='text-gray-700 text-lg font-semibold flex gap-3'>{[icon, title]}</h1>
        <p className='text-2xl font-bold'>{content}</p>
    </div>
  )
}
