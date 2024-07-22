import { useEffect, useState } from 'react'
import TextInput from '../components/common/TextInput'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { userLogin } from '../service/Api'
import { toast } from 'react-toastify'
import useUserStore from '../zustand/userStore'

const SignIn = () => {
  const [signInData, setSigunInData] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const { user, setUser } = useUserStore(state => ({
    user: state.user,
    setUser: state.setUser
  }))
  useEffect(() => {
    if (user) {
      navigate('/posts')
    }
  }, [])

  const handleChange = e => {
    const name = e.target.name
    const value = e.target.value
    setSigunInData({ ...signInData, [name]: value })
  }

  const validate = name => {
    if (!signInData[name]) {
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

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await userLogin(signInData)
      if (res.status === 200) {
        toast('Welcome ' + res.data.name)
        setUser(res.data)
        localStorage.setItem('auth', res.data.token)
      } else {
        toast.error('Something went wrong!')
      }

      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return user ? (
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
            Sign in to your account
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Email address
              </label>
              <div className='mt-2'>
                <TextInput
                  onFocus={() => onFocus('email')}
                  onBlur={() => validate('email')}
                  name='email'
                  error={errors.email}
                  value={signInData.email}
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
                  onFocus={() => onFocus('password')}
                  onBlur={() => validate('password')}
                  value={signInData.password}
                  error={errors.password}
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
            Not a member?{' '}
            <Link
              to='/sign_up'
              className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
            >
              Create New Account
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default SignIn
