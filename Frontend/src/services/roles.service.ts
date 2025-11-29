import { httpGet, type ApiListResponse } from './http.service'

type ApiRole = {
  id: number
  name: string
  status?: boolean | null
}

export type RoleRow = {
  id: number
  name: string
  status: string
}

type RolesResponse = ApiListResponse<{
  roles?: ApiRole[]
}>

const FALLBACK_ROLES: RoleRow[] = [
  { id: 1, name: 'Admin', status: 'Activo' },
  { id: 2, name: 'Usuario', status: 'Activo' },
]

const normalizeRoles = (roles: ApiRole[] = []): RoleRow[] =>
  roles.map((role) => ({
    id: role.id,
    name: role.name,
    status: role.status === false ? 'Inactivo' : 'Activo',
  }))

/**
 * TODO: Implementar el consumo de API siguiendo el patrón de test.service.ts
 * 
 * Debes implementar esta función similar a listTests() en test.service.ts (líneas 31-43)
 * 
 * Pasos:
 * 1. Usar httpGet<RolesResponse>('/roles') para consumir el endpoint
 * 2. Extraer los roles de response.data?.roles
 * 3. Si no hay roles o el arreglo está vacío, retornar FALLBACK_ROLES
 * 4. Si hay roles, normalizarlos con normalizeRoles() y retornarlos
 * 5. En caso de error, hacer console.warn y retornar FALLBACK_ROLES
 * 
 * Ver ejemplo funcional en: src/services/test.service.ts (líneas 31-43)
 */
export const listRoles = async (): Promise<RoleRow[]> => {
  // TODO: Implementar consumo de API aquí
  // Ejemplo de cómo debe quedar (descomenta y adapta):
  /*
  try {
    const response = await httpGet<RolesResponse>('/roles')
    const roles = response.data?.roles
    if (!roles || roles.length === 0) {
      return FALLBACK_ROLES
    }
    return normalizeRoles(roles)
  } catch (error) {
    console.warn('listRoles fallback:', error)
    return FALLBACK_ROLES
  }
  */
  
  // Por ahora retorna datos mock
  return FALLBACK_ROLES
}

