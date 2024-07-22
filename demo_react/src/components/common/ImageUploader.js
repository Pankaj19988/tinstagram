import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'
import React, { useState, useRef } from 'react'

const ImageUploader = ({ setSelectedImage, error }) => {
  const [selectedFiles, setSelectedFiles] = useState([])
  const fileInputRef = useRef(null)

  const handleDrop = e => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFileInput = e => {
    const files = Array.from(e.target.files)
    handleFiles(files)
  }

  const handleFiles = files => {
    const validFiles = files.filter(file => file.type.startsWith('image/'))
    setSelectedFiles([...selectedFiles, ...validFiles])
    setSelectedImage([...selectedFiles, ...validFiles])
  }

  const handleDragOver = e => {
    e.preventDefault()
  }

  const handleClick = () => {
    fileInputRef.current.click()
  }

  return (
    <>
      <div
        className={`image-uploader ${error && '-mb-4'}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleClick}
      >
        <input
          type='file'
          accept='image/*'
          onChange={handleFileInput}
          style={{ display: 'none' }}
          ref={fileInputRef}
          multiple
        />
        <div
          className={`upload-area bg-gray-50 hover:bg-gray-100 p-4 border ${
            error ? 'border-red-600 border-2' : 'border-gray-200'
          } text-black rounded-lg flex justify-center items-center`}
        >
          <div className='flex gap-4 items-center text-gray-600'>
            <ArrowUpTrayIcon className='h-6 w-6' />
            <div>
              <p className=' text-sm'>Drop or select images</p>
            </div>
          </div>
        </div>
        {error && <p className='text-red-500 text-sm m-0'>{error}</p>}
      </div>
      <div className='flex gap-2 flex-wrap my-3 '>
        {selectedFiles.map((file, index) => (
          <div key={index} className='preview'>
            <img
              src={URL.createObjectURL(file)}
              alt='img'
              className='w-[100px] aspect-square object-cover rounded-sm shadow-sm'
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default ImageUploader
