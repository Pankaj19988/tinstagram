import React from 'react'

const TextInput = ({
  name,
  value,
  error,
  type,
  onBlur,
  onFocus,
  required,
  className,
  onChange
}) => {
  return (
    <div className='relative'>
      <input
        name={name}
        type={type || 'text'}
        value={value}
        required={required}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className={`${className}
        block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6  ring-inset focus:ring-inset
        ${
          error
            ? 'ring-2 ring-red-600 focus:ring-red-600'
            : 'ring-1 focus:ring-2 ring-gray-300 focus:ring-indigo-600'
        }
        `}
      />
      {error && (
        <p className='text-red-500 text-sm m-0 absolute bottom-[-18px] left-0'>
          {error}
        </p>
      )}
    </div>
  )
}

export default TextInput
