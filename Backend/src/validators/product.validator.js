import { ProductServices } from '../servicios/product.servicios.js';
import { body, param } from 'express-validator';

class ProductValidator {

  validateProduct = [
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('name').isString().withMessage('El nombre debe ser una cadena de texto'),

  ];

  validateProductId = [
    param('id').notEmpty().withMessage('El id es requerido'),
    param('id').isInt().withMessage('El id debe ser un número entero'),
    
    param('id').custom(async (id) => {
      const { status } = await ProductServices.getById(Number(id));
      if (status === 404) {
        throw new Error('El id no existe en los registros');
      }
      return true;
    }),
  ];

  validateIfNameIsUse = async (req, res, next) => {
    const { id } = req.params;  
    const { name } = req.body;   
    
    if (!name) return next();


    const { status, message, data } = await ProductServices.getByName(name);
    
    if (status == 500) {
      return res.status(500).json({ message });
    } 
   
    if (status == 200) {

      const productFound = data.product; 
      
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
      else {
        if (Number(id) !== productFound.id) {
           return res.status(400).json({
            errors: [{
                type: 'field',
                msg: `El nombre "${name}" ya pertenece a otro producto.`, 
                path: 'name',
                location: 'body',
            }],
          });
        }
      }
    }

    next();
  };
}

export { ProductValidator };