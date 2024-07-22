import React from 'react'
import PeopleProfile from './common/PeopleProfile'
import { getProfileImage } from '../utils/imageUtils'

const ProfileSidebar = ({ user }) => {
  return (
    <div
      className='flex flex-col gap-6'
    >
      <PeopleProfile
        name={user?.name}
        role={user?.email}
        image={getProfileImage(user?.id)}
      />
    </div>
  )
}

export default ProfileSidebar
