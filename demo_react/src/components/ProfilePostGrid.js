import React, { useEffect, useState } from 'react'
import { likePost, userPosts } from '../service/Api'
import { toast } from 'react-toastify'
import { HeartIcon } from '@heroicons/react/24/outline'
import useUserStore from '../zustand/userStore'

const ProfilePostGrid = ({ user}) => {
  const [posts, setPosts] = useState([])
  const loggedInUser = useUserStore(state => state.user)

  const getPosts = async userId => {
    const posts = await userPosts(userId)
    if (posts?.status === 200) {
      setPosts(posts.data)
    } else {
      toast.error('Something went wrong!')
    }
  }

  useEffect(() => {
    getPosts(user.id)
  }, [user])

  const likePostApi = async postId => {
    const liekPost = await likePost(postId)
    if (liekPost?.status === 201) {
      getPosts(user.id)
    } else {
      toast.error('Something went wrong in liking post!')
    }
  }

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
      {posts.length === 0 ? (
        <div className='flex mt-12 items-center justify-center'>
          <p className='text-lg text-gray-500'>No posts yet.</p>
        </div>
      ) : (
        posts.map(post => (
          <div
            key={post.title}
            className='rounded-xl shadow-md border border-gray-100 p-2'
          >
            {post.images?.length ? (
              <img
                alt=''
                src={process.env.REACT_APP_API_URL + post.images[0]?.url}
                className='aspect-[3/2] w-full rounded-2xl ring-1 ring-gray-200 object-cover'
              />
            ) : (
              <div className='bg-gray-50 ring-1 ring-gray-200 w-full aspect-[3/2] flex justify-center items-center text-gray-200 text-lg'>
                Image not found!
              </div>
            )}
            <div className='mt-4 flex justify-between'>
              <div>
                <h3 className='capitalize text-md font-semibold leading-8 tracking-tight text-gray-900 line-clamp-1'>
                  {post.title}
                </h3>
              </div>
              <div className='flex flex-col items-center'>
                <div
                  onClick={() => likePostApi(post.id)}
                  className=' cursor-pointer flex gap-1'
                >
                  {post.likes?.map(a => a.userId).includes(loggedInUser.id) ? (
                    <HeartIcon className='size-6 text-red-500' fill='red' />
                  ) : (
                    <HeartIcon className='size-6 text-black-500' />
                  )}
                  <p>{post.likes?.length}</p>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default ProfilePostGrid
