import { useNavigate } from 'react-router-dom'
import { followUser, usersAll } from '../service/Api'
import { useEffect, useState } from 'react'
import useUserStore from '../zustand/userStore'
import { getProfileImage } from '../utils/imageUtils'

const PeopleList = () => {
  const [userData, setUserData] = useState([])
  const navigate = useNavigate()

  const { user } = useUserStore()

  const getAllUser = async () => {
    const res = await usersAll()
    if (res.status === 200) {
      const data = res.data.filter(item => item.id !== user.id)
      setUserData([...data])
    }
  }

  useEffect(() => {
    getAllUser()
  }, [])

  const handleFollow = async userId => {
    const res = await followUser(userId)
    if (res.status === 200) {
      getAllUser()
    }
  }

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-6xl px-6 text-center lg:px-8'>
        <div className='mx-auto max-w-2xl'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl py-4'>
            Suggestion To You
          </h2>
        </div>
        {!userData.length ? (
          <div className='flex mt-12 items-center justify-center'>
            <p className='text-lg text-gray-500'>No suggestion yet.</p>
          </div>
        ) : (
          <ul
            className='mx-auto mt-6 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3'
          >
            {userData?.map(person => (
              <li
                key={person.name}
                className='border-gray-200 border p-4 rounded-lg shadow-lg flex flex-col gap-4'
              >
                <img
                  alt='img'
                  src={getProfileImage(person.id)}
                  className='mx-auto h-40 w-40 rounded-full cursor-pointer'
                  onClick={() => navigate(`/profile?id=${person.id}`)}
                />
                <h3
                  className='text-truncat whitespace-nowrap text-lg capitalize font-semibold leading-7 tracking-tight text-gray-900 cursor-pointer'
                  onClick={() => navigate(`/profile?id=${person.id}`)}
                >
                  {person.name}
                </h3>
                <button
                  className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  onClick={() => handleFollow(person.id)}
                >
                  {person?.followerIds?.find(item => item === user.id)
                    ? 'UnFollow'
                    : 'Follow'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default PeopleList
