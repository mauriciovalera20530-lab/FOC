import { prisma } from '../config/prisma.config.js';

const RoleServices = {
    getAll: async () => {
        try {
            const roles = await prisma.role.findMany({
                where: { status: true },
            });
            if (roles.length === 0) {
                return {
                    message: `No se encontraron roles`,
                    status: 404,
                    data: {
                        roles: [],
                        total: 0
                    },
                };
            }
            return {
                message: `Roles encontrados`,
                status: 200,
                data: {
                    roles,
                    total: roles.length
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
            const role = await prisma.role.findFirst({
                where: {
                    id: id,
                    status: true,
                },
            });
            if (!role) {
                return {
                    message: `Rol no encontrado`,
                    status: 404,
                    data: {},
                };
            } else {
                return {
                    message: `Rol encontrado`,
                    status: 200,
                    data: {
                        role,
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
            const role = await prisma.role.findFirst({
                where: {
                    name: name,
                    status: true,
                },
            });
            if (!role) {
                return {
                    message: `Rol no encontrado`,
                    status: 404,
                    data: {},
                };
            } else {
                return {
                    message: `Rol encontrado`,
                    status: 200,
                    data: {
                        role,
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

    create: async (roleData) => {
        try {
            const newRole = await prisma.role.create({
                data: {
                    name: roleData.name,
                },
            });
            return {
                message: `Rol creado exitosamente`,
                status: 201,
                data: {
                    role: newRole,
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

    update: async (id, roleData) => {
        try {
            const role = await prisma.role.update({
                where: { id: id },
                data: {
                    name: roleData.name,
                    updatedAt: new Date(),
                    status: roleData.status !== undefined ? roleData.status : true,
                },
            });
            return {
                message: `Rol actualizado exitosamente`,
                status: 200,
                data: {
                    role,
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
            const role = await prisma.role.update({
                where: { id: id },
                data: {
                    status: false,
                    updatedAt: new Date(),
                },
            });
            return {
                message: `Rol eliminado exitosamente`,
                status: 204,
                data: {
                    role,
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

export { RoleServices };
