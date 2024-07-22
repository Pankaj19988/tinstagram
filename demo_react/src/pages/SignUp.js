import { useState } from 'react'
import TextInput from '../components/common/TextInput'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { userRegister } from '../service/Api'
import { toast } from 'react-toastify'
import useUserStore from '../zustand/userStore'

const SignUp = () => {
  const [signUpData, setSigunUpData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = e => {
    const name = e.target.name
    const value = e.target.value
    setSigunUpData({ ...signUpData, [name]: value })
  }

  const navigate = useNavigate()
  const loggedInUser = useUserStore(state => state.user)

  const handleSubmite = async e => {
    e.preventDefault()
    const response = await userRegister(signUpData)
    console.log(response)
    if (response.status === 201) {
      toast.success('Successfully signed up!. login to continue...')
      navigate('/sign_in')
    } else {
      if (response.response.status === 400) {
        setErrors({
          ...errors,
          email: response.response.data.error
        })
      } else {
        toast.success('Something went wrong!')
      }
    }
  }

  const validate = name => {
    if (!signUpData[name]) {
      setErrors({
        ...errors,
        [name]: 'This field is required!'
      })
    }
  }

  const onFocus = name => {
    setErrors({
      ...errors,
      [name]: ''
    })
  }

  return loggedInUser ? (
    <Navigate to='/posts' />
  ) : (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <img
            alt='Your Company'
            src='logo.png'
            className='mx-auto h-10 w-auto'
          />
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Sign Up to your account
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form onSubmit={handleSubmite} className='space-y-6'>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Full Name
              </label>
              <div className='mt-2'>
                <TextInput
                  onFocus={() => onFocus('name')}
                  onBlur={() => validate('name')}
                  name='name'
                  error={errors.name}
                  value={signUpData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Email address
              </label>
              <div className='mt-2'>
                <TextInput
                  name='email'
                  onFocus={() => onFocus('email')}
                  onBlur={() => validate('email')}
                  value={signUpData.email}
                  error={errors.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Password
                </label>
              </div>
              <div className='mt-2'>
                <TextInput
                  name='password'
                  type='password'
                  value={signUpData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className='mt-10 text-center text-sm text-gray-500'>
            I have already account?{' '}
            <Link
              to='/sign_in'
              className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
            >
              Sign In Account
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default SignUp
