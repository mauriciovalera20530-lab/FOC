import { prisma } from '../config/prisma.config.js';

const UserServices = {
    getAll: async () => {
        try {
            const users = await prisma.user.findMany({
                where: { status: true },
            });
            if (users.length === 0) {
                return {
                    message: `No se encontraron Usuarios`,
                    status: 404,
                    data: {
                        users: [],
                        total: 0
                    },
                };
            }
            return {
                message: `Usuarios encontrados`,
                status: 200,
                data: {
                    users,
                    total: users.length
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
            const user = await prisma.user.findFirst({
                where: {
                    id: id,
                    status: true,
                },
            });
            if (!user) {
                return {
                    message: `Usuario no encontrado`,
                    status: 404,
                    data: {},
                };
            } else {
                return {
                    message: `Usuario encontrado`,
                    status: 200,
                    data: {
                        user,
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

    create: async (userData) => {
        try {
            const newUser = await prisma.user.create({
                data: {
                    name: userData.name,
                    email: userData.email,
                    password: userData.password,
                    roleId: userData.roleId,
                    createdAt: new Date(),},
            });
            return {
                message: `Usuario creado exitosamente`,
                status: 201,
                data: {
                    user: newUser,
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

    update: async (id, userData) => {
        try {
            const user = await prisma.user.update({
                where: { id: id },
                data: {
                    name: userData.name,
                    email: userData.email,
                    password: userData.password,
                    roleId: userData.roleId,
                    updatedAt: new Date(),
                    status: userData.status !== undefined ? userData.status : true,
                },
            });
            return {
                message: `Usuario actualizado exitosamente`,
                status: 200,
                data: {
                    user,
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
            const user = await prisma.user.update({
                where: { id: id },
                data: {
                    status: false,
                    updatedAt: new Date(),
                },
            });
            return {
                message: `Usuario eliminado exitosamente`,
                status: 204,
                data: {
                    user,
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

    getByEmail: async (email) => {
        try {
            const user = await prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                return {
                    message: `Usuario no encontrado`,
                    status: 404,
                    data: {
                        user,
                    },
                };
            } else {
                return {
                    message: `Usuario encontrado`,
                    status: 200,
                    data: {
                        user,
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

export { UserServices };
