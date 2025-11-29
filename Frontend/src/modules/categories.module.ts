import { listCategories, type CategoryRow } from '../services/categories.service'

const CATEGORIES_TABLE_BODY_ID = 'categories-table-body'

const renderTableRows = (categories: CategoryRow[]) =>
  categories
    .map(
      (category) => `
    <tr>
      <td>${category.id}</td>
      <td>${category.name}</td>
      <td>${category.status}</td>
    </tr>
  `,
    )
    .join('')

const renderStatusRow = (message: string, isError = false) => `
  <tr>
    <td colspan="3" class="table-status ${isError ? 'error' : ''}">
      ${message}
    </td>
  </tr>
`

export const renderCategoriesModule = () => `
  <section class="module">
    <header class="module__header">
      <p class="eyebrow">Módulo</p>
      <h2>Categorías</h2>
      <p class="muted">
        Lista de categorías registradas en el inventario. Esta tabla se conecta con
        <code>/api/v1/categories</code> para mostrar los datos reales.
      </p>
    </header>
    <div class="table-wrapper">
      <table class="module-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Nombre</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody id="${CATEGORIES_TABLE_BODY_ID}">
          ${renderStatusRow('Cargando categorías...')}
        </tbody>
      </table>
    </div>
  </section>
`

export const mountCategoriesModule = async () => {
  const tableBody = document.querySelector<HTMLTableSectionElement>(`#${CATEGORIES_TABLE_BODY_ID}`)
  if (!tableBody) return

  const setRows = (rows: string) => {
    tableBody.innerHTML = rows
  }

  try {
    const categories = await listCategories()
    if (!categories.length) {
      setRows(renderStatusRow('No hay categorías registradas.'))
      return
    }
    setRows(renderTableRows(categories))
  } catch (error) {
    console.error('mountCategoriesModule error:', error)
    setRows(renderStatusRow('No se pudieron cargar las categorías.', true))
  }
}

