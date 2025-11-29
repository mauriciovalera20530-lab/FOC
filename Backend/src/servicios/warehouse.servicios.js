import { prisma } from '../config/prisma.config.js';

const WarehouseServices = {
    getAll: async () => {
        try {
            const warehouses = await prisma.warehouse.findMany({
                where: { status: true },
            });
            if (warehouses.length === 0) {
                return {
                    message: `No se encontraron warehouses`,
                    status: 404,
                    data: {
                        warehouses: [],
                        total: 0
                    },
                };
            }
            return {
                message: `warehouses encontradas`,
                status: 200,
                data: {
                    warehouses,
                    total: warehouses.length
                },
            };
        } catch (error) {
            console.error(error);
            return {
                message: `Por favor contacte al administrador`,
                status: 500,
            };
        }
    },

    getById: async (id) => {
        try {
            const warehouse = await prisma.warehouse.findFirst({
                where: {
                    id: id,
                    status: true,
                },
            });
            if (!warehouse) {
                return {
                    message: `Warehouse no encontrada`,
                    status: 404,
                    data: {},
                };
            } else {
                return {
                    message: `Warehouse encontrada`,
                    status: 200,
                    data: {
                        warehouse,
                    },
                };
            }
        } catch (error) {
            console.log(error);
            return {
                message: `Por favor contacte al administrador`,
                status: 500,
            };
        }
    },
        getByName: async (name) => {
        try {
            const warehouse = await prisma.warehouse.findFirst({
                where: {
                    name: name,
                    status: true,
                },
            });
            if (!warehouse) {
                return {
                    message: `Warehouse no encontrada`,
                    status: 404,
                    data: {},
                };
            } else {
                return {
                    message: `Warehouse encontrada`,
                    status: 200,
                    data: {
                        warehouse,
                    },
                };
            }
        } catch (error) {
            console.log(error);
            return {
                message: `Por favor contacte al administrador`,
                status: 500,
            };
        }
    },

    create: async (warehouseData) => {
        try {
            const newWarehouse = await prisma.warehouse.create({
                data: {
                    name: warehouseData.name,
                },
            });
            return {
                message: `Warehouse creada exitosamente`,
                status: 201,
                data: {
                    warehouse: newWarehouse,
                },
            };
        } catch (error) {
            console.error(error);
            return {
                message: `Por favor contacte al administrador`,
                status: 500,
            };
        }
    },

    update: async (id, newWarehouse) => {
        try {
            const warehouse = await prisma.warehouse.update({
                where: { id: id },
                data: {
                    name: newWarehouse.name,
                    updatedAt: new Date(),
                    status: newWarehouse.status !== undefined ? newWarehouse.status : true,
                },
            });
            return {
                message: `Warehouse actualizada exitosamente`,
                status: 200,
                data: {
                    warehouse,
                },
            };
        } catch (error) {
            console.error(error);
            return {
                message: `Por favor contacte al administrador`,
                status: 500,
            };
        }
    },

    delete: async (id) => {
        try {
            const warehouse = await prisma.warehouse.update({
                where: { id: id },
                data: {
                    status: false,
                    updatedAt: new Date(),
                },
            });
            return {
                message: `warehouse eliminada exitosamente`,
                status: 204,
                data: {
                    warehouse,
                },
            };
        } catch (error) {
            console.error(error);
            return {
                message: `Por favor contacte al administrador`,
                status: 500,
            };
        }
    },
};

export { WarehouseServices };
