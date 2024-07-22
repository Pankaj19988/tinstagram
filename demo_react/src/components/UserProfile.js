import React from 'react'
import ProfilePostGrid from './ProfilePostGrid'
import { getProfileImage } from '../utils/imageUtils'
import useUserStore from '../zustand/userStore'

const UserProfile = ({ user, handleFollow }) => {
  const { id } = useUserStore(state => state.user)
  return (
    <div className='bg-white p-6'>
      <div className='flex sm:flex-row flex-col gap-10 items-center'>
        <img
          className='h-56 w-56 rounded-full shadow-md ring-8 ring-indigo-600 aspect-square'
          src={getProfileImage(user.id)}
          alt='Profile'
        />
        <div className='flex flex-col sm:flex-row gap-4 w-full justify-around'>
          <div className='flex flex-col gap-4 justify-around w-full items-center sm:items-start'>
            <div className='flex flex-col gap-2'>
              <p className='sm:text-4xl text-2xl capitalize font-bold'>{user?.name}</p>
              <p className='text-lg font-normal text-indigo-500'>
                {user?.email}
              </p>
            </div>
            <div className='text-center flex gap-12 items-around items-center'>
              <div>
                <p className='text-2xl font-semibold'>Followers</p>
                <h1 className='text-xl'>{user.followerIds.length}</h1>
              </div>
              <div>
                <p className='text-2xl font-semibold'>Followings</p>
                <h1 className='text-xl'>{user.followingIds.length}</h1>
              </div>
            </div>
          </div>
          <div className='flex sm:items-end w-full sm:max-w-52 items-center'>
            {user.id !== id && (
              <button
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                onClick={() => handleFollow(user.id)}
              >
                {user.followerIds.find(item => item === id)
                  ? 'UnFollow'
                  : 'Follow'}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className='mt-4 sm:mt-8'>
        <h2 className='text-2xl font-bold mb-4'>Posts</h2>
        <ProfilePostGrid user={user} />
      </div>
    </div>
  )
}

export default UserProfile
