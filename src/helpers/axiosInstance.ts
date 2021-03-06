import axios from 'axios'

const axiosInstance = axios.create({ 
  baseURL: process.env.API_HOST 
})

axiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent

  if (localStorage.accessToken) {
    const token = localStorage.accessToken
    config.headers.Authorization = 'Bearer ' + token

    return config
  }

  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

axiosInstance.interceptors.response.use(function (response) {
  // Do something with response data
  response.data = (response.data).data
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default axiosInstance