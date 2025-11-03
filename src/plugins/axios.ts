import { errorMessage } from '@/composables/useNotify'
import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import i18n from './i18n'

type AxiosInstanceType = 'cash' | 'client' | 'warehouse'

type AxiosCollection = Record<AxiosInstanceType, AxiosInstance>

// const baseURL = import.meta.env.VITE_APP_BASE_CASH_URL
// const api: AxiosInstance = axios.create({
//   baseURL: baseURL,
//   timeout: 100000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })

const api: AxiosCollection = {
  cash: axios.create({ baseURL: import.meta.env.VITE_APP_BASE_CASH_URL }),
  client: axios.create({ baseURL: import.meta.env.VITE_APP_BASE_CLIENT_URL }),
  warehouse: axios.create({ baseURL: import.meta.env.VITE_APP_BASE_WAREHOUSE_URL }),
}

Object.values(api).forEach((item: AxiosInstance) => {
  item.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('token')

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error: AxiosError) => {
      return Promise.reject(error)
    },
  )
})

Object.values(api).forEach((item: AxiosInstance) => {
  item.interceptors.response.use(
    (response: AxiosResponse) => {
      return response
    },
    (error: AxiosError) => {
      let message = i18n.global.t('label.errorAccured')

      if (error.response) {
        switch (error.response.status) {
          case 400:
            message = i18n.global.t('label.wrongRequest')
            break
          case 401:
            message = i18n.global.t('label.requiresAuth')
            localStorage.clear()
            location.reload()
            break
          case 403:
            message = i18n.global.t('label.notAllowed')
            break
          case 404:
            message = i18n.global.t('label.noData')
            break
          case 500:
            message = i18n.global.t('label.serverError')
            break
        }
      } else if (error.message.includes('timeout')) {
        message = i18n.global.t('label.requestTimeout')
      }

      errorMessage(message)

      return Promise.reject(error)
    },
  )
})

// Request Interceptor
// api.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const token = localStorage.getItem('token')

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error: AxiosError) => {
//     return Promise.reject(error)
//   },
// )

// Response Interceptor
// api.interceptors.response.use(
//   (response: AxiosResponse) => {
//     return response
//   },
//   (error: AxiosError) => {
//     let message = i18n.global.t('label.errorAccured')

//     if (error.response) {
//       switch (error.response.status) {
//         case 400:
//           message = i18n.global.t('label.wrongRequest')
//           break
//         case 401:
//           message = i18n.global.t('label.requiresAuth')
//           break
//         case 403:
//           message = i18n.global.t('label.notAllowed')
//           break
//         case 404:
//           message = i18n.global.t('label.noData')
//           break
//         case 500:
//           message = i18n.global.t('label.serverError')
//           break
//       }
//     } else if (error.message.includes('timeout')) {
//       message = i18n.global.t('label.requestTimeout')
//     }

//     errorMessage(message)

//     return Promise.reject(error)
//   },
// )

export default api
