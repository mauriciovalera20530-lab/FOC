import { httpGet, type ApiListResponse } from './http.service'

type ApiWarehouse = {
  id: number
  name: string
  status?: boolean | null
}

export type WarehouseRow = {
  id: number
  name: string
  status: string
}

type WarehousesResponse = ApiListResponse<{
  warehouses?: ApiWarehouse[]
}>

const FALLBACK_WAREHOUSES: WarehouseRow[] = [
  { id: 1, name: 'Almacén 1', status: 'Activo' },
  { id: 2, name: 'Almacén 2', status: 'Activo' },
]

const normalizeWarehouses = (warehouses: ApiWarehouse[] = []): WarehouseRow[] =>
  warehouses.map((warehouse) => ({
    id: warehouse.id,
    name: warehouse.name,
    status: warehouse.status === false ? 'Inactivo' : 'Activo',
  }))

/**
 * TODO: Implementar el consumo de API siguiendo el patrón de test.service.ts
 * 
 * Debes implementar esta función similar a listTests() en test.service.ts (líneas 31-43)
 * 
 * Pasos:
 * 1. Usar httpGet<WarehousesResponse>('/warehouses') para consumir el endpoint
 * 2. Extraer los almacenes de response.data?.warehouses
 * 3. Si no hay almacenes o el arreglo está vacío, retornar FALLBACK_WAREHOUSES
 * 4. Si hay almacenes, normalizarlos con normalizeWarehouses() y retornarlos
 * 5. En caso de error, hacer console.warn y retornar FALLBACK_WAREHOUSES
 * 
 * Ver ejemplo funcional en: src/services/test.service.ts (líneas 31-43)
 */
export const listWarehouses = async (): Promise<WarehouseRow[]> => {
  // TODO: Implementar consumo de API aquí
  // Ejemplo de cómo debe quedar (descomenta y adapta):
  /*
  try {
    const response = await httpGet<WarehousesResponse>('/warehouses')
    const warehouses = response.data?.warehouses
    if (!warehouses || warehouses.length === 0) {
      return FALLBACK_WAREHOUSES
    }
    return normalizeWarehouses(warehouses)
  } catch (error) {
    console.warn('listWarehouses fallback:', error)
    return FALLBACK_WAREHOUSES
  }
  */
  
  // Por ahora retorna datos mock
  return FALLBACK_WAREHOUSES
}

