import { listWarehouses, type WarehouseRow } from '../services/warehouses.service'

const WAREHOUSES_TABLE_BODY_ID = 'warehouses-table-body'

const renderTableRows = (warehouses: WarehouseRow[]) =>
  warehouses
    .map(
      (warehouse) => `
    <tr>
      <td>${warehouse.id}</td>
      <td>${warehouse.name}</td>
      <td>${warehouse.status}</td>
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

export const renderWarehousesModule = () => `
  <section class="module">
    <header class="module__header">
      <p class="eyebrow">Módulo</p>
      <h2>Almacenes</h2>
      <p class="muted">
        Lista de almacenes registrados. Esta tabla se conecta con <code>/api/v1/warehouses</code>
        para mostrar los datos reales.
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
        <tbody id="${WAREHOUSES_TABLE_BODY_ID}">
          ${renderStatusRow('Cargando almacenes...')}
        </tbody>
      </table>
    </div>
  </section>
`

export const mountWarehousesModule = async () => {
  const tableBody = document.querySelector<HTMLTableSectionElement>(`#${WAREHOUSES_TABLE_BODY_ID}`)
  if (!tableBody) return

  const setRows = (rows: string) => {
    tableBody.innerHTML = rows
  }

  try {
    const warehouses = await listWarehouses()
    if (!warehouses.length) {
      setRows(renderStatusRow('No hay almacenes registrados.'))
      return
    }
    setRows(renderTableRows(warehouses))
  } catch (error) {
    console.error('mountWarehousesModule error:', error)
    setRows(renderStatusRow('No se pudieron cargar los almacenes.', true))
  }
}
