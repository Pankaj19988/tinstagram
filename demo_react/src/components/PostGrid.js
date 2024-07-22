import { HeartIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { feedPost, likePost, userPosts } from '../service/Api'
import { toast } from 'react-toastify'
import PluseFill from './common/PluseFill'
import PopupModal from './common/PopupModal'
import AddPost from './AddPost'
import useUserStore from '../zustand/userStore'
import { getProfileImage } from '../utils/imageUtils'
import moment from 'moment'
import { useLocation, useNavigate } from 'react-router-dom'

const PostGrid = () => {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)

  const [posts, setPosts] = useState([])
  const user = useUserStore(state => state.user)
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const id = queryParams.get('id')
  useEffect(() => {
    getPosts(id)
  }, [id])

  const getPosts = async id => {
    if (id) {
      getUserPosts(id)
    } else {
      const posts = await feedPost()
      if (posts?.status === 200) {
        setPosts(Array.from([...posts.data]))
      } else {
        toast.error('Something went wrong!')
      }
    }
  }

  const getUserPosts = async userId => {
    const posts = await userPosts(userId)
    if (posts?.status === 200) {
      setPosts(posts.data)
    } else {
      toast.error('Something went wrong!')
    }
  }

  const likePostApi = async postId => {
    const liekPost = await likePost(postId)
    if (liekPost?.status === 201) {
      getPosts(id || '')
    } else {
      toast.error('Something went wrong in liking post!')
    }
  }

  const formatDateTime = timestamp => {
    return moment(timestamp).format('Do MMM, YYYY h:mm A')
  }

  return (
    <div className='bg-white flex'>
      <div className='mx-auto max-w-7xl sm:px-6 lg:px-8 flex max-h-[100vh] overflow-y-auto scroll-hide'>
        <ul className='divide divide-y-2 divide-gray-200 mx-auto grid  grid-cols-1 gap-x-8 max-w-[620px]'>
          {posts.length === 0 ? (
            <div className='flex mt-12 items-center justify-center'>
              <p className='text-lg text-gray-500'>Please Upload Post</p>
            </div>
          ) : (
            posts?.map(post => (
              <li key={post.title} className='py-6 px-4'>
                <div
                  className='flex gap-2 items-center mb-2 cursor-pointer'
                  onClick={() => navigate(`/profile?id=${post.userId}`)}
                >
                  <img
                    className='w-14 rounded-full shadow-md ring-2 ring-indigo-600'
                    alt='img'
                    src={getProfileImage(post.userId)}
                  />
                  <div>
                    <p className='m-0 capitalize font-semibold'>
                      {post.owner.name}
                    </p>
                    <p className='text-gray-600 font-normal'>
                      Created At : {formatDateTime(post.createdAt)}
                    </p>
                  </div>
                </div>
                {post.images?.length ? (
                  <img
                    alt='img'
                    src={process.env.REACT_APP_API_URL + post.images[0]?.url}
                    className='aspect-[3/2] w-full rounded-2xl ring-1 ring-gray-200 object-cover'
                  />
                ) : (
                  <div className='bg-gray-50 ring-1 ring-gray-200 w-full aspect-[3/2] flex justify-center items-center text-gray-200 text-lg'>
                    Image not found!
                  </div>
                )}
                <div className='mt-2 flex justify-between'>
                  <div>
                    <h3 className=' text-lg font-semibold leading-8 tracking-tight text-gray-900'>
                      {post.title}
                    </h3>
                    <p className='text-base leading-7 text-gray-600  line-clamp-2'>
                      {post.description}
                    </p>
                  </div>
                  <div className='flex flex-col items-center'>
                    <div
                      onClick={() => likePostApi(post.id)}
                      className=' cursor-pointer'
                    >
                      {post.likes?.map(a => a.userId).includes(user.id) ? (
                        <HeartIcon
                          className='size-10 text-red-500 hover:scale-110 duration-300'
                          fill='red'
                        />
                      ) : (
                        <HeartIcon className='size-10 text-black-500 hover:scale-110 duration-300' />
                      )}
                    </div>
                    <p>{post.likes?.length}</p>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
      <button
        onClick={() => setOpenModal(true)}
        className='fixed bottom-7 right-5 md:right-10'
      >
        <PluseFill />
      </button>
      <PopupModal
        open={openModal}
        setOpen={setOpenModal}
        Children={
          <AddPost
            setOpenModal={setOpenModal}
            onSuccess={() => {
              getPosts(id)
            }}
          />
        }
      />
    </div>
  )
}

export default PostGrid
