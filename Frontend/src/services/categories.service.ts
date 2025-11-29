import { httpGet, type ApiListResponse } from './http.service'

type ApiCategory = {
  id: number
  name: string
  status?: boolean | null
}

export type CategoryRow = {
  id: number
  name: string
  status: string
}

type CategoriesResponse = ApiListResponse<{
  categories?: ApiCategory[]
}>

const FALLBACK_CATEGORIES: CategoryRow[] = [
  { id: 1, name: 'Categoría 1', status: 'Activo' },
  { id: 2, name: 'Categoría 2', status: 'Activo' },
]

const normalizeCategories = (categories: ApiCategory[] = []): CategoryRow[] =>
  categories.map((category) => ({
    id: category.id,
    name: category.name,
    status: category.status === false ? 'Inactivo' : 'Activo',
  }))

/**
 * TODO: Implementar el consumo de API siguiendo el patrón de test.service.ts
 * 
 * Debes implementar esta función similar a listTests() en test.service.ts (líneas 31-43)
 * 
 * Endpoint a consumir: http://localhost:3785/api/v1/categories
 * 
 * Pasos:
 * 1. Usar httpGet<CategoriesResponse>('/categories') para consumir el endpoint
 * 2. Extraer las categorías de response.data?.categories
 * 3. Si no hay categorías o el arreglo está vacío, retornar FALLBACK_CATEGORIES
 * 4. Si hay categorías, normalizarlas con normalizeCategories() y retornarlas
 * 5. En caso de error, hacer console.warn y retornar FALLBACK_CATEGORIES
 * 
 * Ver ejemplo funcional en: src/services/test.service.ts (líneas 31-43)
 */
export const listCategories = async (): Promise<CategoryRow[]> => {
  // TODO: Implementar consumo de API aquí
  // Ejemplo de cómo debe quedar (descomenta y adapta):
  /*
  try {
    const response = await httpGet<CategoriesResponse>('/categories')
    const categories = response.data?.categories
    if (!categories || categories.length === 0) {
      return FALLBACK_CATEGORIES
    }
    return normalizeCategories(categories)
  } catch (error) {
    console.warn('listCategories fallback:', error)
    return FALLBACK_CATEGORIES
  }
  */
  
  // Por ahora retorna datos mock
  return FALLBACK_CATEGORIES
}

