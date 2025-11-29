import { prisma } from '../config/prisma.config.js';

const AreaServices = {
    getAll: async () => {
        try {
            const area = await prisma.area.findMany({
                where: { status: true },
            });
            if (area.length === 0) {
                return {
                    message: `No se encontraron Areas`,
                    status: 404,
                    data: {
                        areas: [],
                        total: 0
                    },
                };
            }
            return {
                message: `Areas encontradas`,
                status: 200,
                data: {
                    area,
                    total: area.length
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
            const area = await prisma.area.findFirst({
                where: {
                    id: id,
                    status: true,
                },
            });
            if (!area) {
                return {
                    message: `Area no encontrada`,
                    status: 404,
                    data: {},
                };
            } else {
                return {
                    message: `Area encontrada`,
                    status: 200,
                    data: {
                        area,
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



    create: async (areaData) => {
        try {
            const newArea = await prisma.area.create({
                data: {
                    name: areaData.name,
                    warehouseId: areaData.warehouseId
                },
            });
            return {
                message: `Area creada exitosamente`,
                status: 201,
                data: {
                    area: newArea,
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



    update: async (id, areaData) => {
        try {
            const area = await prisma.area.update({
                where: { id: id },
                data: {
                    name: areaData.name,
                    warehouseId: areaData.warehouseId,
                    updatedAt: new Date(),
                    status: areaData.status !== undefined ? areaData.status : true,
                },
            });
            return {
                message: `Area actualizado exitosamente`,
                status: 200,
                data: {
                    area,
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
            const area = await prisma.area.update({
                where: { id: id },
                data: {
                    status: false,
                    updatedAt: new Date(),
                },
            });
            return {
                message: `Area eliminada exitosamente`,
                status: 204,
                data: {
                    area,
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

    getByName: async (name) => {
        try {
            const area = await prisma.area.findFirst({
                where: { name: name, status: true },
            });

            if (!area) {
                return {
                    message: `Area no encontrada`,
                    status: 404,
                    data: {
                        area,
                    },
                };
            } else {
                return {
                    message: `Area encontrada`,
                    status: 200,
                    data: {
                        area,
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
};

export { AreaServices };
