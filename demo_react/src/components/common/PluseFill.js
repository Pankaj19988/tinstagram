import React from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'

const PluseFill = () => {
  return (
    <div className='border w-fit rounded-full p-3 bg-indigo-600 shadow-lg hover:scale-105 duration-300'>
      <PlusIcon className='h-10 w-10 text-white' />
    </div>
  )
}

export default PluseFill
