import React from 'react'

const PeopleProfile = ({ image, name, role }) => {
  return (
    <div>
      <div className='flex items-center gap-x-6'>
        <img alt='img' src={image} className='h-16 w-16 rounded-full shadow--lg' />
        <div>
          <h3 className='text-xl capitalize font-semibold leading-8 tracking-tight text-gray-50'>
            {name}
          </h3>
          <p className='text-sm font-semibold leading-6 text-gray-200 truncate whitespace-nowrap w-44'>
            {role}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PeopleProfile
