/**
 * MÓDULO ROLES
 * 
 * TODO: Implementar consumo de API siguiendo el patrón de test.module.ts
 * 
 * Pasos a seguir:
 * 1. Crear src/services/roles.service.ts siguiendo el patrón de test.service.ts
 * 2. Importar listRoles y RoleRow desde el servicio
 * 3. Agregar un ID al tbody (ej: ROLES_TABLE_BODY_ID = 'roles-table-body')
 * 4. Crear función renderTableRows(roles: RoleRow[]) similar a test.module.ts
 * 5. Crear función renderStatusRow(message: string, isError = false) similar a test.module.ts
 * 6. Cambiar el tbody para usar el ID y mostrar "Cargando..." inicialmente
 * 7. Crear función mountRolesModule() similar a mountTestModule() en test.module.ts (líneas 52-72)
 * 8. En main.ts, agregar el caso 'roles' en mountModule() para llamar a mountRolesModule()
 */

import { listRoles, type RoleRow } from '../services/roles.service'

const ROLES_TABLE_BODY_ID = 'roles-table-body'

const renderTableRows = (roles: RoleRow[]) =>
  roles
    .map(
      (role) => `
    <tr>
      <td>${role.id}</td>
      <td>${role.name}</td>
      <td>${role.status}</td>
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

export const renderRolesModule = () => `
  <section class="module">
    <header class="module__header">
      <p class="eyebrow">Módulo</p>
      <h2>Roles</h2>
      <p class="muted">
        Lista de roles del sistema. Esta tabla se conecta con <code>/api/v1/roles</code>
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
        <tbody id="${ROLES_TABLE_BODY_ID}">
          ${renderStatusRow('Cargando roles...')}
        </tbody>
      </table>
    </div>
  </section>
`

export const mountRolesModule = async () => {
  const tableBody = document.querySelector<HTMLTableSectionElement>(`#${ROLES_TABLE_BODY_ID}`)
  if (!tableBody) return

  const setRows = (rows: string) => {
    tableBody.innerHTML = rows
  }

  try {
    const roles = await listRoles()
    if (!roles.length) {
      setRows(renderStatusRow('No hay roles registrados.'))
      return
    }
    setRows(renderTableRows(roles))
  } catch (error) {
    console.error('mountRolesModule error:', error)
    setRows(renderStatusRow('No se pudieron cargar los roles.', true))
  }
}

