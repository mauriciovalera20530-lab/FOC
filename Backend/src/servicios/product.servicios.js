import { prisma } from '../config/prisma.config.js';

const ProductServices = {
    getAll: async () => {
        try {
            const products = await prisma.product.findMany({
                where: { status: true },
            });
            if (products.length === 0) {
                return {
                    message: `No se encontraron productos`,
                    status: 404,
                    data: {
                        products: [],
                        total: 0
                    },
                };
            }
            return {
                message: `productos encontrados`,
                status: 200,
                data: {
                    products,
                    total: products.length
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
            const product = await prisma.product.findFirst({
                where: {
                    id: id,
                    status: true,
                },
            });
            if (!product) {
                return {
                    message: `Producto no encontrado`,
                    status: 404,
                    data: {},
                };
            } else {
                return {
                    message: `Producto encontrado`,
                    status: 200,
                    data: {
                        product,
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

    

    create: async (productData) => {
        try {
            const newProduct = await prisma.product.create({
                data: {
                    name: productData.name,
                    price: productData.price,
                    quantity: productData.quantity,
                    categoryId: productData.categoryId,
                    areaId: productData.areaId,
                    createdAt: new Date(),},
            });
            return {
                message: `Producto creado exitosamente`,
                status: 201,
                data: {
                    product: newProduct,
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

    

    update: async (id, productData) => {
        try {
            const product = await prisma.product.update({
                where: { id: id },
                data: {
                    name: productData.name,
                    price: productData.price,
                    quantity: productData.quantity,
                    categoryId: productData.categoryId,
                    areaId: productData.areaId,
                    updatedAt: new Date(),
                    status: productData.status !== undefined ? productData.status : true,
                },
            });
            return {
                message: `Producto actualizado exitosamente`,
                status: 200,
                data: {
                    product,
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
            const product = await prisma.product.update({
                where: { id: id },
                data: {
                    status: false,
                    updatedAt: new Date(),
                },
            });
            return {
                message: `Producto eliminado exitosamente`,
                status: 204,
                data: {
                    product,
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
            const product = await prisma.product.findFirst({
                where: { name: name, status: true},
            });

            if (!product) {
                return {
                    message: `Producto no encontrado`,
                    status: 404,
                    data: {
                        product,
                    },
                };
            } else {
                return {
                    message: `Producto encontrado`,
                    status: 200,
                    data: {
                        product,
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

export { ProductServices };
