import { httpGet, type ApiListResponse } from './http.service'

type ApiArea = {
  id: number
  name: string
  warehouse_id?: number | null
  status?: boolean | null
}

export type AreaRow = {
  id: number
  name: string
  warehouse: string
  status: string
}

type AreasResponse = ApiListResponse<{
  areas?: ApiArea[]
}>

const FALLBACK_AREAS: AreaRow[] = [
  { id: 1, name: 'Área 1', warehouse: 'Almacén #1', status: 'Activo' },
  { id: 2, name: 'Área 2', warehouse: 'Almacén #2', status: 'Activo' },
]

const normalizeAreas = (areas: ApiArea[] = []): AreaRow[] =>
  areas.map((area) => ({
    id: area.id,
    name: area.name,
    warehouse: area.warehouse_id ? `Almacén #${area.warehouse_id}` : 'Sin almacén',
    status: area.status === false ? 'Inactivo' : 'Activo',
  }))

/**
 * TODO: Implementar el consumo de API siguiendo el patrón de test.service.ts
 * 
 * Debes implementar esta función similar a listTests() en test.service.ts (líneas 31-43)
 * 
 * Pasos:
 * 1. Usar httpGet<AreasResponse>('/areas') para consumir el endpoint
 * 2. Extraer las áreas de response.data?.areas
 * 3. Si no hay áreas o el arreglo está vacío, retornar FALLBACK_AREAS
 * 4. Si hay áreas, normalizarlas con normalizeAreas() y retornarlas
 * 5. En caso de error, hacer console.warn y retornar FALLBACK_AREAS
 * 
 * Ver ejemplo funcional en: src/services/test.service.ts (líneas 31-43)
 */
export const listAreas = async (): Promise<AreaRow[]> => {
  // TODO: Implementar consumo de API aquí
  // Ejemplo de cómo debe quedar (descomenta y adapta):
  /*
  try {
    const response = await httpGet<AreasResponse>('/areas')
    const areas = response.data?.areas
    if (!areas || areas.length === 0) {
      return FALLBACK_AREAS
    }
    return normalizeAreas(areas)
  } catch (error) {
    console.warn('listAreas fallback:', error)
    return FALLBACK_AREAS
  }
  */
  
  // Por ahora retorna datos mock
  return FALLBACK_AREAS
}

