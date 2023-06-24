import axios, { AxiosError, CancelTokenSource } from 'axios'
import qs from 'qs'
import { VITE_LOCAL_SERVER_HOST } from '../constants/env'

export const RESOURCE_URL = 'https://ya-praktikum.tech/api/v2/resources'
const BASE_URL = 'https://ya-praktikum.tech/api/v2'

const CANCEL_REQUEST = 'cancel request'

const CancelToken = axios.CancelToken
export const tokenSource = CancelToken.source()

interface CancelTokenHandler {
  [key: string]: {
    handleRequestCancellation: () => CancelTokenSource | undefined
  }
}

interface CancelTokenRequestHandler {
  cancelToken: CancelTokenSource | undefined
}

export function createCancelTokenHandler(thunks: string[]) {
  const cancelTokenHandler: CancelTokenHandler = {}

  thunks.forEach(propertyName => {
    const cancelTokenRequestHandler: CancelTokenRequestHandler = {
      cancelToken: undefined,
    }

    cancelTokenHandler[propertyName] = {
      handleRequestCancellation: () => {
        if (cancelTokenRequestHandler.cancelToken) {
          cancelTokenRequestHandler.cancelToken.cancel(CANCEL_REQUEST)
        }

        cancelTokenRequestHandler.cancelToken = CancelToken.source()

        return cancelTokenRequestHandler.cancelToken
      },
    }
  })

  return cancelTokenHandler
}

export const responseInterceptorError = (error: AxiosError | Error | any) => {
  if (error.message !== CANCEL_REQUEST) {
    if (error.error) {
      console.log(error.error)
    } else {
      console.log(error)
    }
  }
  return Promise.reject(error)
}

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 3000,
})

axiosInstance.interceptors.response.use(undefined, responseInterceptorError)
axiosInstance.defaults.paramsSerializer = {
  serialize: params => qs.stringify(params, { arrayFormat: 'repeat' }),
}

export const axiosLocalApiInstance = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 3000,
})

axiosLocalApiInstance.interceptors.response.use(
  undefined,
  responseInterceptorError
)
axiosLocalApiInstance.defaults.paramsSerializer = {
  serialize: params => qs.stringify(params, { arrayFormat: 'repeat' }),
}
