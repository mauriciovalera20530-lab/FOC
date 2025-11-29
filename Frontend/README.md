# Frontend IUJO FOC 2025-2

Interfaz en Vite + TypeScript para visualizar todos los módulos del sistema de inventario. Esta aplicación se conecta con la API REST desarrollada en `api15112025`, incorpora navegación sin framework y consume los endpoints de listado (GET) para todas las entidades mediante Axios.

**Autor:** Ing. Eduardo Nieves (`zedmous@gmail.com`)

## 🧱 Arquitectura y stack
- **Vite + TypeScript**: bundler ultrarrápido con soporte ESM nativo.
- **Vanilla TS/DOM**: los módulos se renderizan con plantillas HTML sencillas (sin React/Vue).
- **Axios**: cliente HTTP centralizado (`src/services/http.service.ts`).
- **Diseño**: estilos globales (`src/style.css`) con un tema oscuro consistente.

```
src/
 ├─ main.ts                # Router minimal y montaje de cada módulo
 ├─ style.css              # Estilos globales + tablas
 ├─ modules/               # Vistas por dominio (test, roles, categories, warehouses, users, areas, products)
 └─ services/              # Axios + servicios de datos (solo test.service.ts implementado como ejemplo)
```

## ✅ Características actuales
- Navegación entre todas las entidades del sistema.
- **Módulo Test**: Conectado al endpoint `/api/v1/test` usando Axios (ejemplo funcional completo).
- **Otros módulos**: Estructura lista pero consumo de API pendiente de implementar (ver TODOs en servicios).
- Layout responsivo con modo oscuro y estados de carga/empty/error.
- Fallback a datos mock si la API no responde.

## 🚀 Requisitos
- Node.js 20+
- npm 10+
- Backend en ejecución: [`api15112025`](../api15112025) o cualquier API compatible.

## ⚙️ Variables de entorno
Crear un archivo `.env` en la raíz del proyecto con la URL base del backend:

```
VITE_API_URL=http://localhost:3785/api/v1
```

> Si omites la variable, el frontend usará `http://localhost:3785/api/v1` por defecto.

## 🏁 Puesta en marcha
1. **Instalar dependencias**
   ```bash
   npm install
   ```
2. **Definir `.env`** (ver sección anterior).
3. **Levantar el backend** (`npm run start:dev` dentro de `api15112025`).
4. **Iniciar el frontend**
   ```bash
   npm run dev
   ```
5. Abrir `http://localhost:5173` y navegar por los diferentes módulos para ver las tablas conectadas.

## 📜 Scripts disponibles

| Script | Descripción |
| --- | --- |
| `npm run dev` | Inicia Vite con recarga en caliente |
| `npm run build` | Compila TypeScript y genera la build para producción |
| `npm run preview` | Sirve la build generada para validar la salida final |

## 🔌 Endpoints consumidos

**Solo el módulo Test consume la API real** como ejemplo:

- `GET ${VITE_API_URL}/test` — listado de registros de test (✅ **Implementado y funcionando**)

**Los demás módulos tienen TODOs en sus servicios** y deben ser implementados por los estudiantes:

- `GET ${VITE_API_URL}/roles` — listado de roles (📝 Pendiente - ver `roles.service.ts`)
- `GET ${VITE_API_URL}/categories` — listado de categorías (📝 Pendiente - ver `categories.service.ts`)
- `GET ${VITE_API_URL}/warehouses` — listado de almacenes (📝 Pendiente - ver `warehouses.service.ts`)
- `GET ${VITE_API_URL}/users` — listado de usuarios (📝 Pendiente - ver `users.service.ts`)
- `GET ${VITE_API_URL}/areas` — listado de áreas (📝 Pendiente - ver `areas.service.ts`)
- `GET ${VITE_API_URL}/products` — listado de productos (📝 Pendiente - ver `products.service.ts`)

**Nota**: El módulo `test` sirve como ejemplo de cómo consumir la API. Los estudiantes deben seguir el mismo patrón para implementar el consumo de los demás módulos. Ver comentarios TODO en cada servicio.

## 📋 Módulos disponibles

1. **Test** - Registros de prueba del sistema
2. **Roles** - Gestión de roles del sistema
3. **Categorías** - Categorías de productos
4. **Almacenes** - Almacenes disponibles
5. **Usuarios** - Usuarios del sistema
6. **Áreas** - Áreas dentro de los almacenes
7. **Productos** - Productos del inventario

## 🧪 Estructura de archivos

**Módulo Test (ejemplo funcional)**:
- **Servicio**: `src/services/test.service.ts` - Consume el endpoint GET `/api/v1/test` (✅ Implementado)
- **Módulo**: `src/modules/test.module.ts` - Renderiza la tabla y consume la API (✅ Implementado)

**Otros módulos (pendientes de implementar)**:
- **Servicios**: `src/services/{entidad}.service.ts` - Tienen TODOs con instrucciones para implementar el consumo
- **Módulos**: `src/modules/{entidad}.module.ts` - Estructura lista, solo falta conectar el servicio

**Para implementar consumo de API en otros módulos**:
1. Abrir `src/services/{entidad}.service.ts`
2. Seguir las instrucciones en los comentarios TODO
3. Descomentar y adaptar el código de ejemplo (basado en `test.service.ts`)
4. El módulo ya está configurado para usar el servicio, solo necesita que el servicio esté implementado

---
**Autor:** Ing. Eduardo Nieves (`zedmous@gmail.com`). Contribuciones y sugerencias son bienvenidas. 🎉

