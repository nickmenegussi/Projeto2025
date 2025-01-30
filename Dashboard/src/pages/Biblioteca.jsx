import React from 'react'

export default function Biblioteca() {
  return (
    <div className='flex flex-col p-6 gap-5'>
      <h1>Algo HERE</h1>

      <div>
        <table class="table-auto w-full rounded-lg overflow-hidden border-gray-800">
            <thead className='bg-gray-900 text-white uppercase text-sm'>
              <tr>
                <th className='px-4 py-3 text-left'>Song</th>
                <th className='px-4 py-3 text-left'>Artist</th>
                <th className='px-4 py-3 text-left'>Year</th>
              </tr>
            </thead>
            <tbody className='bg-gray-100 divide-y '>
              <tr className='hover:bg-gray-200'>
                <td className='px-4 py-3 text-left'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                <td className='px-4 py-3 text-left'>Malcolm Lockyer</td>
                <td className='px-4 py-3 text-left'>1961</td>
              </tr>
              <tr className='hover:bg-gray-200'>
                <td className='px-4 py-3 text-left'>Witchy Woman</td>
                <td className='px-4 py-3 text-left'>The Eagles</td>
                <td className='px-4 py-3 text-left'>1972</td>
              </tr>
              <tr className='hover:bg-gray-200'>
                <td className='px-4 py-3 text-left'>Shining Star</td>
                <td className='px-4 py-3 text-left'>Earth, Wind, and Fire</td>
                <td className='px-4 py-3 text-left'>1975</td>
              </tr>
            </tbody>
          </table>
      </div>
    </div>
  )
}
