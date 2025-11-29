import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'

const API_BASE = (import.meta.env?.VITE_API_URL as string) ?? 'http://localhost:3800/api'

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10_000,
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'Error de red. Verifica que la API esté disponible.'
    return Promise.reject(new Error(message))
  },
)

export const httpGet = async <T>(
  path: string,
  config: AxiosRequestConfig = {},
): Promise<T> => {
  const response = await apiClient.get<T>(path, config)
  return response.data
}

export type ApiListResponse<T> = {
  message?: string
  data?: T
}
