import { listAreas, type AreaRow } from '../services/areas.service'

const AREAS_TABLE_BODY_ID = 'areas-table-body'

const renderTableRows = (areas: AreaRow[]) =>
  areas
    .map(
      (area) => `
    <tr>
      <td>${area.id}</td>
      <td>${area.name}</td>
      <td>${area.warehouse}</td>
      <td>${area.status}</td>
    </tr>
  `,
    )
    .join('')

const renderStatusRow = (message: string, isError = false) => `
  <tr>
    <td colspan="4" class="table-status ${isError ? 'error' : ''}">
      ${message}
    </td>
  </tr>
`

export const renderAreasModule = () => `
  <section class="module">
    <header class="module__header">
      <p class="eyebrow">Módulo</p>
      <h2>Áreas</h2>
      <p class="muted">
        Lista de áreas registradas. Esta tabla se conecta con <code>/api/v1/areas</code>
        para mostrar los datos reales.
      </p>
    </header>
    <div class="table-wrapper">
      <table class="module-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Nombre</th>
            <th>Almacén</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody id="${AREAS_TABLE_BODY_ID}">
          ${renderStatusRow('Cargando áreas...')}
        </tbody>
      </table>
    </div>
  </section>
`

export const mountAreasModule = async () => {
  const tableBody = document.querySelector<HTMLTableSectionElement>(`#${AREAS_TABLE_BODY_ID}`)
  if (!tableBody) return

  const setRows = (rows: string) => {
    tableBody.innerHTML = rows
  }

  try {
    const areas = await listAreas()
    if (!areas.length) {
      setRows(renderStatusRow('No hay áreas registradas.'))
      return
    }
    setRows(renderTableRows(areas))
  } catch (error) {
    console.error('mountAreasModule error:', error)
    setRows(renderStatusRow('No se pudieron cargar las áreas.', true))
  }
}
