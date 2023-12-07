import axios from 'axios'

export const setupAxiosInterceptors = (onUnauthenticated: () => void) => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        onUnauthenticated()
      }
      return Promise.reject(error)
    }
  )
}
