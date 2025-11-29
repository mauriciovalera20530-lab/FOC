import './style.css'
import { renderTestModule, mountTestModule } from './modules/test.module'
import { renderCategoriesModule, mountCategoriesModule } from './modules/categories.module'
import { renderUsersModule, mountUsersModule } from './modules/users.module'
import { renderRolesModule, mountRolesModule } from './modules/roles.module'
import { renderWarehousesModule, mountWarehousesModule } from './modules/warehouses.module'
import { renderAreasModule, mountAreasModule } from './modules/areas.module'
import { renderProductsModule, mountProductsModule } from './modules/products.module'

type Route = 'home' | 'test' | 'categories' | 'users' | 'roles' | 'warehouses' | 'areas' | 'products'

const NAV_ITEMS: { label: string; route: Route }[] = [
  { label: 'Inicio', route: 'home' },
  { label: 'Test', route: 'test' },
  { label: 'Roles', route: 'roles' },
  { label: 'Categorías', route: 'categories' },
  { label: 'Almacenes', route: 'warehouses' },
  { label: 'Usuarios', route: 'users' },
  { label: 'Áreas', route: 'areas' },
  { label: 'Productos', route: 'products' },
]

const state: { route: Route } = {
  route: 'home',
}

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('No se encontró el contenedor principal #app')
}

const navigate = (route: Route) => {
  state.route = route
  render()
}

const render = () => {
  app.innerHTML = `
    <div class="layout">
      ${renderNav()}
      <main class="view">
        ${renderRoute()}
      </main>
    </div>
  `
  bindNavEvents()
  mountModule()
}

const mountModule = () => {
  switch (state.route) {
    case 'test':
      void mountTestModule()
      break
    case 'categories':
      void mountCategoriesModule()
      break
    case 'users':
      void mountUsersModule()
      break
    case 'roles':
      void mountRolesModule()
      break
    case 'warehouses':
      void mountWarehousesModule()
      break
    case 'areas':
      void mountAreasModule()
      break
    case 'products':
      void mountProductsModule()
      break
  }
}

const renderNav = () => `
  <nav class="nav">
    <h1>Inventario Textil</h1>
    <ul>
      ${NAV_ITEMS.map(
        ({ label, route }) => `
          <li>
            <button data-route="${route}" class="${state.route === route ? 'active' : ''}">
              ${label}
            </button>
          </li>
        `,
      ).join('')}
    </ul>
  </nav>
`

const renderRoute = () => {
  switch (state.route) {
    case 'test':
      return renderTestModule()
    case 'categories':
      return renderCategoriesModule()
    case 'users':
      return renderUsersModule()
    case 'roles':
      return renderRolesModule()
    case 'warehouses':
      return renderWarehousesModule()
    case 'areas':
      return renderAreasModule()
    case 'products':
      return renderProductsModule()
    default:
      return renderHome()
  }
}

const renderHome = () => `
  <section class="hero card">
    <p class="eyebrow">Panel principal</p>
    <h2>Selecciona una opción del menú para continuar</h2>
    <p>
      Este layout muestra cada módulo del sistema de inventario. Todas las tablas se conectan
      con los endpoints del backend para mostrar los datos reales.
    </p>
    <div style="margin-top: 2rem;">
      <h3>Módulos disponibles:</h3>
      <ul style="list-style: disc; margin-left: 2rem; margin-top: 1rem;">
        <li><strong>Test</strong> - Registros de prueba</li>
        <li><strong>Roles</strong> - Gestión de roles del sistema</li>
        <li><strong>Categorías</strong> - Categorías de productos</li>
        <li><strong>Almacenes</strong> - Almacenes disponibles</li>
        <li><strong>Usuarios</strong> - Usuarios del sistema</li>
        <li><strong>Áreas</strong> - Áreas dentro de los almacenes</li>
        <li><strong>Productos</strong> - Productos del inventario</li>
      </ul>
    </div>
  </section>
`

const bindNavEvents = () => {
  document.querySelectorAll<HTMLButtonElement>('[data-route]').forEach((button) => {
    button.addEventListener('click', () => {
      const route = button.dataset.route as Route
      if (route && route !== state.route) {
        navigate(route)
      }
    })
  })
}

render()
