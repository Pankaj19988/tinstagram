import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:9090/api'
})

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Retrieve token from local storage or wherever it's stored after login
    const token = localStorage.getItem('auth')
    if (token) {
      // Set authorization header with token
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default instance
