import { httpGet, type ApiListResponse } from './http.service'

// Tipo que viene de la Base de Datos
type ApiRole = {
  id: number
  name: string
  status?: boolean | null
}

// Tipo que usa la Tabla Visual
export type RoleRow = {
  id: number
  name: string
  status: string
}

type RolesResponse = ApiListResponse<{
  roles?: ApiRole[]
}>

const FALLBACK_ROLES: RoleRow[] = []

const normalizeRoles = (roles: ApiRole[] = []): RoleRow[] =>
  roles.map((role) => ({
    id: role.id,
    name: role.name,
    status: role.status === false ? 'Inactivo' : 'Activo',
  }))

export const listRoles = async (): Promise<RoleRow[]> => {
  try {
    // Petición al Backend real
    const response = await httpGet<RolesResponse>('/roles')
    const roles = response.data?.roles

    if (!roles || roles.length === 0) {
      return FALLBACK_ROLES
    }
    return normalizeRoles(roles)
  } catch (error) {
    console.warn('Error conectando con Backend (Roles):', error)
    return FALLBACK_ROLES
  }
}