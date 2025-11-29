import { listProducts, type ProductRow } from '../services/products.service'

const PRODUCTS_TABLE_BODY_ID = 'products-table-body'

const renderTableRows = (products: ProductRow[]) =>
  products
    .map(
      (product) => `
    <tr>
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${product.quantity}</td>
      <td>${product.category}</td>
      <td>${product.area}</td>
      <td>${product.status}</td>
    </tr>
  `,
    )
    .join('')

const renderStatusRow = (message: string, isError = false) => `
  <tr>
    <td colspan="7" class="table-status ${isError ? 'error' : ''}">
      ${message}
    </td>
  </tr>
`

export const renderProductsModule = () => `
  <section class="module">
    <header class="module__header">
      <p class="eyebrow">Módulo</p>
      <h2>Productos</h2>
      <p class="muted">
        Lista de productos registrados. Esta tabla se conecta con <code>/api/v1/products</code>
        para mostrar los datos reales.
      </p>
    </header>
    <div class="table-wrapper">
      <table class="module-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Categoría</th>
            <th>Área</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody id="${PRODUCTS_TABLE_BODY_ID}">
          ${renderStatusRow('Cargando productos...')}
        </tbody>
      </table>
    </div>
  </section>
`

export const mountProductsModule = async () => {
  const tableBody = document.querySelector<HTMLTableSectionElement>(`#${PRODUCTS_TABLE_BODY_ID}`)
  if (!tableBody) return

  const setRows = (rows: string) => {
    tableBody.innerHTML = rows
  }

  try {
    const products = await listProducts()
    if (!products.length) {
      setRows(renderStatusRow('No hay productos registrados.'))
      return
    }
    setRows(renderTableRows(products))
  } catch (error) {
    console.error('mountProductsModule error:', error)
    setRows(renderStatusRow('No se pudieron cargar los productos.', true))
  }
}
