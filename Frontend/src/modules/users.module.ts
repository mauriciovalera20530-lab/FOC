import { listUsers, type UserRow } from '../services/users.service'

const USERS_TABLE_BODY_ID = 'users-table-body'

const renderTableRows = (users: UserRow[]) =>
  users
    .map(
      (user) => `
    <tr>
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.role}</td>
      <td>${user.email}</td>
      <td>${user.status}</td>
    </tr>
  `,
    )
    .join('')

const renderStatusRow = (message: string, isError = false) => `
  <tr>
    <td colspan="5" class="table-status ${isError ? 'error' : ''}">
      ${message}
    </td>
  </tr>
`

export const renderUsersModule = () => `
  <section class="module">
    <header class="module__header">
      <p class="eyebrow">Módulo</p>
      <h2>Usuarios</h2>
      <p class="muted">
        Referencia de usuarios del sistema. Esta tabla se conecta con <code>/api/v1/users</code>
        para mostrar los datos reales.
      </p>
    </header>
    <div class="table-wrapper">
      <table class="module-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Email</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody id="${USERS_TABLE_BODY_ID}">
          ${renderStatusRow('Cargando usuarios...')}
        </tbody>
      </table>
    </div>
  </section>
`

export const mountUsersModule = async () => {
  const tableBody = document.querySelector<HTMLTableSectionElement>(`#${USERS_TABLE_BODY_ID}`)
  if (!tableBody) return

  const setRows = (rows: string) => {
    tableBody.innerHTML = rows
  }

  try {
    const users = await listUsers()
    if (!users.length) {
      setRows(renderStatusRow('No hay usuarios registrados.'))
      return
    }
    setRows(renderTableRows(users))
  } catch (error) {
    console.error('mountUsersModule error:', error)
    setRows(renderStatusRow('No se pudieron cargar los usuarios.', true))
  }
}

