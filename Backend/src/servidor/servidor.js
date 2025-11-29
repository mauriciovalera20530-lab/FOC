import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import userRoutes from '../rutas/user.rutas.js';
import roleRoutes from '../rutas/roles.rutas.js';
import categoryRoutes from '../rutas/categories.rutas.js';
import warehouseRoutes from '../rutas/warehouse.rutas.js';
import areaRoutes from '../rutas/area.rutas.js';
import productRoutes from '../rutas/product.rutas.js';
import testRoutes from '../rutas/test.rutas.js';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

export class Servidor {
    app;
    port;

    constructor() {
        this.app = express();
        this.port = process.env.API_PORT || 3800;
        this.pre = '/api';
        this.middlewares()

        this.rutas = {
            roles:`${this.pre}/roles`,
            users:`${this.pre}/users`,
            categories:`${this.pre}/categories`,
            warehouse:`${this.pre}/warehouses`,
            area:`${this.pre}/areas`,
            products:`${this.pre}/products`,
            test: `${this.pre}/test`
        };

        this.routes();
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(express.json());
        this.app.use(express.static(path.join(__dirname, '../public')));
    }

routes = () => {
        this.app.use(this.rutas.users,userRoutes)
        this.app.use(this.rutas.roles,roleRoutes)
        this.app.use(this.rutas.categories,categoryRoutes)
        this.app.use(this.rutas.warehouse,warehouseRoutes)
        this.app.use(this.rutas.area,areaRoutes)
        this.app.use(this.rutas.products,productRoutes)
        this.app.use(this.rutas.test,testRoutes)
        
}

    listen = () => {
        this.app.listen(this.port, () => {
            console.log(`Server running at http://localhost:${this.port}`);
        })
    }
}