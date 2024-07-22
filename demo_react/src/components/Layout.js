import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild
} from '@headlessui/react'
import {
  ArrowLeftStartOnRectangleIcon,
  Bars3Icon,
  PhotoIcon,
  UserCircleIcon,
  UserGroupIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import ProfileSidebar from './ProfileSidebar'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import useUserStore from '../zustand/userStore'

function classNames (...classes) {
  return classes.filter(Boolean).join(' ')
}

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const id = searchParams.get('id')

  const navigate = useNavigate()

  const { user, logout } = useUserStore()

  const goToProfile = () => {
    navigate('/profile?id=' + user.id)
    setSidebarOpen(false)
  }

  const handleNavigate = toNavigate => {
    navigate(toNavigate)
    setSidebarOpen(false)
  }
  return !user ? (
    <Navigate to={'/sign_in'} />
  ) : (
    <>
      <div>
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className='relative z-50 lg:hidden'
        >
          <DialogBackdrop
            transition
            className='fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0'
          />

          <div className='fixed inset-0 flex'>
            <DialogPanel
              transition
              className='relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full'
            >
              <TransitionChild>
                <div className='absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0'>
                  <button
                    type='button'
                    onClick={() => setSidebarOpen(false)}
                    className='-m-2.5 p-2.5'
                  >
                    <span className='sr-only'>Close sidebar</span>
                    <XMarkIcon
                      aria-hidden='true'
                      className='h-6 w-6 text-white'
                    />
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className='flex grow flex-col overflow-y-auto bg-white pb-2'>
                <div className='flex h-16 shrink-0 items-center gap-2 px-6'>
                  <img
                    alt='Your Company'
                    src='logo.png'
                    className='h-10 w-auto rounded-lg'
                  />
                  <p className='font-semibold'>Tinstagram</p>
                </div>
                <nav className='flex flex-1 flex-col'>
                  <ul className='flex flex-1 flex-col gap-y-7'>
                    <li>
                      <ul className='-mx-2 space-y-1'>
                        <li className='flex flex-col gap-6'>
                          <div
                            className='py-4 bg-indigo-600 px-6'
                            onClick={goToProfile}
                          >
                            <ProfileSidebar user={user} />
                          </div>
                          <div className='w-full px-6'>
                            <button
                              className={classNames(
                                location.pathname === '/posts' && id
                                  ? 'bg-gray-50 text-indigo-600'
                                  : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 w-full mb-2'
                              )}
                              onClick={() =>
                                handleNavigate(`/posts?id=${user.id}`)
                              }
                            >
                              <UserCircleIcon
                                aria-hidden='true'
                                className={classNames(
                                  location.pathname === '/posts' && id
                                    ? 'text-indigo-600'
                                    : 'text-gray-400 group-hover:text-indigo-600',
                                  'h-6 w-6 shrink-0'
                                )}
                              />
                              My Feed
                            </button>
                            <button
                              className={classNames(
                                location.pathname === '/posts' && !id
                                  ? 'bg-gray-50 text-indigo-600'
                                  : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 w-full'
                              )}
                              onClick={() => handleNavigate('/posts')}
                            >
                              <PhotoIcon
                                aria-hidden='true'
                                className={classNames(
                                  location.pathname === '/posts' && !id
                                    ? 'text-indigo-600'
                                    : 'text-gray-400 group-hover:text-indigo-600',
                                  'h-6 w-6 shrink-0'
                                )}
                              />
                              Explorer
                            </button>
                            <button
                              className={classNames(
                                location.pathname === '/people'
                                  ? 'bg-gray-50 text-indigo-600'
                                  : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 w-full'
                              )}
                              onClick={() => handleNavigate('/people')}
                            >
                              <UserGroupIcon
                                aria-hidden='true'
                                className={classNames(
                                  location.pathname === '/people'
                                    ? 'text-indigo-600'
                                    : 'text-gray-400 group-hover:text-indigo-600',
                                  'h-6 w-6 shrink-0'
                                )}
                              />
                              People
                            </button>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className='flex grow flex-col overflow-y-auto border-r border-gray-200 bg-white scroll-hide'>
            <div className='flex h-16 shrink-0 items-center gap-2 px-6'>
              <img
                alt='Your Company'
                src='logo.png'
                className='h-10 w-auto rounded-lg'
              />
              <p className='font-semibold'>Tinstagram</p>
            </div>
            <nav className='flex flex-1 flex-col'>
              <ul className='flex flex-1 flex-col gap-y-7'>
                <li>
                  <ul className='-mx-2 space-y-1'>
                    <li className='flex flex-col gap-6'>
                      <div
                        className='py-4 bg-indigo-600 px-6'
                        onClick={goToProfile}
                      >
                        <ProfileSidebar user={user} />
                      </div>
                      <div className='w-full px-6'>
                        <button
                          className={classNames(
                            location.pathname === '/posts' && id
                              ? 'bg-gray-50 text-indigo-600'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 w-full mb-2'
                          )}
                          onClick={() => handleNavigate(`/posts?id=${user.id}`)}
                        >
                          <UserCircleIcon
                            aria-hidden='true'
                            className={classNames(
                              location.pathname === '/posts' && id
                                ? 'text-indigo-600'
                                : 'text-gray-400 group-hover:text-indigo-600',
                              'h-6 w-6 shrink-0'
                            )}
                          />
                          My Feed
                        </button>
                        <button
                          className={classNames(
                            location.pathname === '/posts' && !id
                              ? 'bg-gray-50 text-indigo-600'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 w-full'
                          )}
                          onClick={() => handleNavigate('/posts')}
                        >
                          <PhotoIcon
                            aria-hidden='true'
                            className={classNames(
                              location.pathname === '/posts' && !id
                                ? 'text-indigo-600'
                                : 'text-gray-400 group-hover:text-indigo-600',
                              'h-6 w-6 shrink-0'
                            )}
                          />
                          Explorer
                        </button>
                        <button
                          className={classNames(
                            location.pathname === '/people'
                              ? 'bg-gray-50 text-indigo-600'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 w-full'
                          )}
                          onClick={() => handleNavigate('/people')}
                        >
                          <UserGroupIcon
                            aria-hidden='true'
                            className={classNames(
                              location.pathname === '/people'
                                ? 'text-indigo-600'
                                : 'text-gray-400 group-hover:text-indigo-600',
                              'h-6 w-6 shrink-0'
                            )}
                          />
                          People
                        </button>
                      </div>
                    </li>
                  </ul>
                </li>

                <li className=' mt-auto w-full mx-auto px-6'>
                  <button
                    onClick={logout}
                    class='w-full mb-3 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded'
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className='sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden'>
          <button
            type='button'
            onClick={() => setSidebarOpen(true)}
            className='-m-2.5 p-2.5 text-gray-700 lg:hidden'
          >
            <span className='sr-only'>Open sidebar</span>
            <Bars3Icon aria-hidden='true' className='h-6 w-6' />
          </button>
          <div className='flex-1 text-sm font-semibold leading-6 text-gray-900'></div>
          <button className='rotate-180 cursor-pointer' onClick={logout}>
            <ArrowLeftStartOnRectangleIcon className='h-6 w-6 text-red-500' />
          </button>
        </div>

        <main className='lg:pl-72'>
          <div className=''>{children}</div>
        </main>
      </div>
    </>
  )
}

export default Layout
