import React, { useEffect, useState } from 'react'
import UserProfile from '../components/UserProfile'
import { followUser, singleUser } from '../service/Api'
import { useLocation } from 'react-router-dom'

const Profile = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const [user, setUser] = useState(null)
  const id = queryParams.get('id')

  const getData = async id => {
    const res = await singleUser(id)
    if (res.status === 200) {
      setUser(res?.data)
    }
  }

  useEffect(() => {
    getData(id)
  }, [id])

  const handleFollow = async userId => {
    const res = await followUser(userId)
    if (res.status === 200) {
      getData(id)
    }
  }

  return (
    <div>{user && <UserProfile user={user} handleFollow={handleFollow} />}</div>
  )
}

export default Profile
