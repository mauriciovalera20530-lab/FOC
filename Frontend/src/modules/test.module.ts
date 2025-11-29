import { listTests, type TestRow } from '../services/test.service'

const TEST_TABLE_BODY_ID = 'test-table-body'

const renderTableRows = (tests: TestRow[]) =>
  tests
    .map(
      (test) => `
    <tr>
      <td>${test.id}</td>
      <td>${test.name}</td>
      <td>${test.status}</td>
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

export const renderTestModule = () => `
  <section class="module">
    <header class="module__header">
      <p class="eyebrow">Módulo</p>
      <h2>Test</h2>
      <p class="muted">
        Lista de registros de test. Esta tabla se conecta con <code>/api/v1/test</code>
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
        <tbody id="${TEST_TABLE_BODY_ID}">
          ${renderStatusRow('Cargando registros...')}
        </tbody>
      </table>
    </div>
  </section>
`

export const mountTestModule = async () => {
  const tableBody = document.querySelector<HTMLTableSectionElement>(`#${TEST_TABLE_BODY_ID}`)
  if (!tableBody) return

  const setRows = (rows: string) => {
    tableBody.innerHTML = rows
  }

  try {
    const tests = await listTests()
    if (!tests.length) {
      setRows(renderStatusRow('No hay registros de test.'))
      return
    }
    setRows(renderTableRows(tests))
  } catch (error) {
    console.error('mountTestModule error:', error)
    setRows(renderStatusRow('No se pudieron cargar los registros.', true))
  }
}

