import React, { useState } from 'react'
import TextInput from './common/TextInput'
import ImageUploader from './common/ImageUploader'
import { addPost } from '../service/Api'
import { toast } from 'react-toastify'

const AddPost = ({ setOpenModal, onSuccess }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [error, setError] = useState({})
  const [postData, setPostData] = useState({
    title: '',
    description: ''
  })

  const handleChange = e => {
    const name = e.target.name
    const value = e.target.value
    setError({ ...error, [name]: '' })
    setPostData({ ...postData, [name]: value })
  }

  const submitePost = async () => {
    let err = {}

    if (!postData.title) {
      err.title = 'Title is required'
    }
    if (!postData.description) {
      err.description = 'Description is required'
    }
    if (!selectedImage) {
      err.image = 'Please select one image'
    }
    if (Object.keys(err)?.length) {
      console.log(err)
      return setError(err)
    }

    const response = await addPost({ ...postData, files: selectedImage })
    // console.log(response)
    if (response.status === 201) {
      toast.success('Your Post is Uploaded')
      onSuccess()
      setOpenModal(pre => !pre)
    }
  }
  return (
    <div>
      <h2 className='text-center text-lg sm:text-2xl font-semibold'>
        Create Post
      </h2>
      <div className=' mb-6'>
        <label
          htmlFor='email'
          className='block text-sm font-medium leading-6 text-gray-900'
        >
          Title
        </label>
        <div className='mt-2'>
          <TextInput
            error={error.title}
            name='title'
            value={postData.title}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='mb-6'>
        <label
          htmlFor='email'
          className='block text-sm font-medium leading-6 text-gray-900'
        >
          Description
        </label>
        <div className='mt-2'>
          <TextInput
            error={error.description}
            name='description'
            value={postData.description}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <ImageUploader
          setSelectedImage={setSelectedImage}
          error={error.image}
        />
      </div>
      <button
        onClick={submitePost}
        className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
      >
        Submit Your Post
      </button>
    </div>
  )
}

export default AddPost
