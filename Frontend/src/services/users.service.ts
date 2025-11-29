import { httpGet, type ApiListResponse } from './http.service'

type ApiUser = {
  id: number
  name: string | null
  email: string
  role_id?: number | null
  status?: boolean | null
}

export type UserRow = {
  id: number
  name: string
  email: string
  role: string
  status: string
}

type UsersResponse = ApiListResponse<{
  users?: ApiUser[]
}>

const FALLBACK_USERS: UserRow[] = [
  { id: 1, name: 'Usuario 1', email: 'usuario1@example.com', role: 'Rol #1', status: 'Activo' },
  { id: 2, name: 'Usuario 2', email: 'usuario2@example.com', role: 'Rol #2', status: 'Activo' },
]

const normalizeUsers = (users: ApiUser[] = []): UserRow[] =>
  users.map((user) => ({
    id: user.id,
    name: user.name ?? 'Sin nombre',
    email: user.email,
    role: user.role_id ? `Rol #${user.role_id}` : 'Sin rol',
    status: user.status === false ? 'Inactivo' : 'Activo',
  }))

/**
 * TODO: Implementar el consumo de API siguiendo el patrón de test.service.ts
 * 
 * Debes implementar esta función similar a listTests() en test.service.ts (líneas 31-43)
 * 
 * Pasos:
 * 1. Usar httpGet<UsersResponse>('/users') para consumir el endpoint
 * 2. Extraer los usuarios de response.data?.users
 * 3. Si no hay usuarios o el arreglo está vacío, retornar FALLBACK_USERS
 * 4. Si hay usuarios, normalizarlos con normalizeUsers() y retornarlos
 * 5. En caso de error, hacer console.warn y retornar FALLBACK_USERS
 * 
 * Ver ejemplo funcional en: src/services/test.service.ts (líneas 31-43)
 */
export const listUsers = async (): Promise<UserRow[]> => {
  // TODO: Implementar consumo de API aquí
  // Ejemplo de cómo debe quedar (descomenta y adapta):
  /*
  try {
    const response = await httpGet<UsersResponse>('/users')
    const users = response.data?.users
    if (!users || users.length === 0) {
      return FALLBACK_USERS
    }
    return normalizeUsers(users)
  } catch (error) {
    console.warn('listUsers fallback:', error)
    return FALLBACK_USERS
  }
  */
  
  // Por ahora retorna datos mock
  return FALLBACK_USERS
}

