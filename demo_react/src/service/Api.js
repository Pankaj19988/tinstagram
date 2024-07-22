import { user, post } from './endpoint'
import instance from './instance'

export const userRegister = async data => {
  try {
    const res = await instance.post(user.register, {
      name: data.name,
      email: data.email,
      password: data.password
    })
    return res
  } catch (error) {
    return error
  }
}

export const userLogin = async data => {
  try {
    const res = await instance.post(user.login, {
      email: data.email,
      password: data.password
    })
    return res
  } catch (error) {
    return error
  }
}
export const singleUser = async userId => {
  try {
    const res = await instance.get(user.single + '/' + userId)
    return res
  } catch (error) {
    return error
  }
}

export const usersAll = async () => {
  try {
    const res = await instance.get(user.all)
    return res
  } catch (error) {
    return error
  }
}

export const feedPost = async data => {
  try {
    const res = await instance.get(post.posts)
    return res
  } catch (error) {
    return error
  }
}

export const singlePost = async postId => {
  try {
    const res = await instance.get(post.posts + '/' + postId)
    return res
  } catch (error) {
    return error
  }
}

export const userPosts = async userId => {
  try {
    const res = await instance.get(post.userPosts + '/' + userId)
    return res
  } catch (error) {
    return error
  }
}

export const likePost = async postId => {
  try {
    const res = await instance.post(post.like + '/' + postId)
    return res
  } catch (error) {
    return error
  }
}

export const addPost = async data => {
  try {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)

    data?.files?.forEach((file, index) => {
      formData.append(`images`, file)
    })
    const res = await instance.post(post.add, formData)
    return res
  } catch (error) {
    return error
  }
}

export const followUser = async userId => {
  try {
    const res = await instance.post(user.follow + '/' + userId)
    return res
  } catch (error) {
    return error
  }
}
