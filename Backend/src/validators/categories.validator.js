import { CategoriesServices } from '../servicios/categories.servicios.js';
import { body, param } from 'express-validator';

class CategoriesValidator {

  validateCategory = [
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('name').isString().withMessage('El nombre debe ser una cadena de texto'),
  ];

  validateCateId = [
    param('id').notEmpty().withMessage('El id es requerido'),
    param('id').isInt().withMessage('El id debe ser un número entero'),
    
    // Validamos existencia en DB
    param('id').custom(async (id) => {
      // No necesitas verificar si es número aquí, .isInt() ya lo hizo arriba.
      // Solo nos preocupamos por la base de datos.
      const { status } = await CategoriesServices.getById(Number(id));
      
      if (status === 404) {
        throw new Error('El id no existe en los registros');
      }
      return true;
    }),
  ];

  // Middleware manual para verificar nombre único
  validateIfNameIsUse = async (req, res, next) => {
    const { id } = req.params;  
    const { name } = req.body;   
    
    // Nota: Si el usuario no envió un "name", dejamos pasar (validateTest se encargará del error de campo vacío)
    if (!name) return next();

    const { status, message, data } = await CategoriesServices.getByName(name);
    
    if (status == 500) {
      return res.status(500).json({ message });
    } 
   
    // Si status es 200, significa que YA EXISTE una categoría con ese nombre
    if (status == 200) {
      // OJO AQUÍ: Depende de cómo devuelve tu servicio.
      // Si tu servicio devuelve data: { category: {...} }, usa data.category
      // Si devuelve directo el objeto, usa data.
      // Asumiremos que "data" trae la categoría encontrada.
      
      const categoryFound = data.category || data; // Ajuste de seguridad
      
      // CASO 1: Creando nuevo registro (No hay ID en params)
      if (!id) {
        return res.status(400).json({
          errors: [{
              type: 'field',
              msg: `El nombre "${name}" ya está en uso.`,
              path: 'name',
              location: 'body',
          }],
        });
      } 
      
      // CASO 2: Editando registro existente (Hay ID en params)
      else {
        // Si el ID de la categoría que encontramos NO es el mismo que estamos editando...
        // Significa que le estamos robando el nombre a otra categoría.
        if (Number(id) !== categoryFound.id) {
           return res.status(400).json({
            errors: [{
                type: 'field',
                msg: `El nombre "${name}" ya pertenece a otra categoría.`,
                path: 'name',
                location: 'body',
            }],
          });
        }
        // Si el ID es igual, significa que el usuario guardó el mismo nombre en su propia categoría. Eso está permitido.
      }
    }

    next();
  };
}

export { CategoriesValidator };