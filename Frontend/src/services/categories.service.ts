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

const FALLBACK_CATEGORIES: CategoryRow[] = []

const normalizeCategories = (categories: ApiCategory[] = []): CategoryRow[] =>
  categories.map((category) => ({
    id: category.id,
    name: category.name,
    status: category.status === false ? 'Inactivo' : 'Activo',
  }))

export const listCategories = async (): Promise<CategoryRow[]> => {
  try {
    const response = await httpGet<CategoriesResponse>('/categories')
    const categories = response.data?.categories
    if (!categories || categories.length === 0) return FALLBACK_CATEGORIES
    return normalizeCategories(categories)
  } catch (error) {
    console.warn('Error Categories:', error)
    return FALLBACK_CATEGORIES
  }
}