

import { WarehouseServices } from '../servicios/warehouse.servicios.js';
import { body, param } from 'express-validator';

class WarehouseValidator {
 
  validateWarehouse = [
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('name').isString().withMessage('El nombre debe ser una cadena de texto')
  ];


  validateWarehouseId = [
    param('id').notEmpty().withMessage('El id es requerido'),
    param('id').isInt().withMessage('El id debe ser un número'),
    param('id').custom(async (id) => {
      if (!id) {
        throw new Error('El parámetro id es requerido para la verificación');
      }
      if (isNaN(Number(id))) {
        throw new Error(`El parámetro id: ${id} debe ser un número`);
      }
      const { status } = await WarehouseServices.getById(Number(id));
      if (status === 404) {
        throw new Error('El id no se encuentra en los registros');
      }
      return true;
    }),
  ];

 
  validateIfNameIsUse = async (req, res, next) => {
    const { id } = req.params;  
    const { name } = req.body;  
    
    
    const { status, message, data } = await WarehouseServices.getByName(name);
    
    if (status == 500) {
      res.status(status).json({
        message,
      });
      return;
    } 
    else if (status == 200) {
      const warehouse = data.warehouse;
      
      if (!id) {
        res.status(400).json({
          errors: [
            {
              type: 'field',
              msg: `Nombre en uso: ${name}, para el nuevo registro`,
              path: 'name',
              location: 'body',
            },
          ],
        });
        return;
      } 
      else {
        if (id != warehouse.id) {
          res.status(400).json({
            errors: [
              {
                type: 'field',
                msg: `nombre en uso: ${name}, para el registro actual`,
                path: 'name',
                location: 'body',
              },
            ],
          });
          return;
        }
      }
    }
    next();
  };
}

export { WarehouseValidator };

