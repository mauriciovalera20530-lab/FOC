import { httpGet, type ApiListResponse } from './http.service'

type ApiProduct = {
  id: number
  name: string
  price: number
  quantity: number
  categoryId: number
  areaId: number
  status?: boolean | null
}

export type ProductRow = {
  id: number
  name: string
  price: string
  quantity: string
  category: string
  area: string
  status: string
}

type ProductsResponse = ApiListResponse<{
  products?: ApiProduct[]
}>

const FALLBACK_PRODUCTS: ProductRow[] = []

const normalizeProducts = (products: ApiProduct[] = []): ProductRow[] =>
  products.map((product) => ({
    id: product.id,
    name: product.name,
    price: `$${Number(product.price).toFixed(2)}`,
    quantity: product.quantity.toString(),
    category: `Categoría #${product.categoryId}`,
    area: `Área #${product.areaId}`,
    status: product.status === false ? 'Inactivo' : 'Activo',
  }))

export const listProducts = async (): Promise<ProductRow[]> => {
  try {
    const response = await httpGet<ProductsResponse>('/products')
    const products = response.data?.products
    if (!products || products.length === 0) return FALLBACK_PRODUCTS
    return normalizeProducts(products)
  } catch (error) {
    console.warn('Error Products:', error)
    return FALLBACK_PRODUCTS
  }
}