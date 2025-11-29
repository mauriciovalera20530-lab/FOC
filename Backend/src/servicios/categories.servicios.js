import { prisma } from '../config/prisma.config.js';


const CategoriesServices = {
    getAll: async () => {
        try {
            const categories = await prisma.category.findMany({
                where: { status: true},
            });
            if(categories.length ===0) {
                return {
                    message: `No se encontraron categorias`,
                    status: 404,
                    data: {
                        categories: [],
                        total: 0 
                    },
                };
            }
            return {
                message: `Categorias encontradas`,
                status: 200,
                data: {
                    categories,
                    total: categories.length
                },
            };
            } catch (err) {
                console.log(err);
                return {
                    message: `Por favor contacte con el administrador`,
                    status: 500,
                };
            }
       },

       getById: async (id) => {
        try {
            const category = await prisma.category.findFirst({
                where: {
                    id:Number(id),
                    status: true,
                },
            })
                 if(!category){
                return {
                    message: `Categoria no encontrada`,
                    status: 404,
                    data: {
                        category: [],
                    },
                };} else {
                    return {
                        message: `Categoria encontrada`,
                        status: 200,
                        data: {
                            category,
                        },
                    };
                }
            } catch (err) {
                console.log(err);
                return {
                    message: `Por favor contacte con el administrador`,
                    status: 500,
                };
            }
       },

       getByName: async (name) => {
        try {
            const category = await prisma.category.findFirst({
                where: {
                    name: name,
                    status: true,
                },
            });
            if(!category) {
                return {
                    message: `Categoria No Encontrada`,
                    status: 404,
                    data: {
                        category: [],
                        total: 0,                    
                    },
                }
            } else {
                return {
                    message: `Categoria encontrada`,
                    status: 200,
                    data: {
                        category,
                    },
                };
            }
        } catch (err) {
            console.log(err);
            return {
                message: `Por favor contacte con el administrados`,
                status: 500,
            };
        }
       },

       create: async (cateData) => {
        try {
            const newCategory = await prisma.category.create({
                data: {
                    name: cateData.name,
                },
            });
            return {
                message: `Categoria creada exitosamente`,
                status: 201,
                data: {
                    category : newCategory,
                },
            };
        } catch (err) {
            console.log(err);
            return {
                message: `Por favor contacte con el administrador`,
                status: 500,
            };
        }
       },

       update: async (id, cateData) => {

        try {
            const category = await prisma.category.update({
                where: { id: id},
                data: {
                    name: cateData.name,
                    updatedAt: new Date(),
                    status: cateData.status !== undefined ? cateData.status : true,
                },
            });
            return {
                message: `categoria actualizada exitosamente`,
                status: 200,
                data: {
                    category,
                },
            };
            
        } catch (err) {
            console.log(err);
            return {
                message: `Por favor contacte con el administrador`,
                status: 500,
            };
        }

       },

       delete: async (id) => {
        try {
            const category = await prisma.category.update({
                where: { id: Number(id)},
                data: {
                    status: false, 
                    updatedAt: new Date(), 
                },
            });
            return {
                message: `Categoria eliminada exitosamente`,
                status: 200, 
                data: {
                    category,
                },
            };
        } catch (err) {
            console.log(err);
            return {
                message: `Por favor contacte con el administrador`,
                status: 500,
            };
        }
       }
    }

    export { CategoriesServices };
