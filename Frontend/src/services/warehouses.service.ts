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

const FALLBACK_WAREHOUSES: WarehouseRow[] = []

const normalizeWarehouses = (warehouses: ApiWarehouse[] = []): WarehouseRow[] =>
  warehouses.map((warehouse) => ({
    id: warehouse.id,
    name: warehouse.name,
    status: warehouse.status === false ? 'Inactivo' : 'Activo',
  }))

export const listWarehouses = async (): Promise<WarehouseRow[]> => {
  try {
    const response = await httpGet<WarehousesResponse>('/warehouses')
    const warehouses = response.data?.warehouses
    if (!warehouses || warehouses.length === 0) return FALLBACK_WAREHOUSES
    return normalizeWarehouses(warehouses)
  } catch (error) {
    console.warn('Error Warehouses:', error)
    return FALLBACK_WAREHOUSES
  }
}