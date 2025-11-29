

import { AreaServices } from '../servicios/area.servicios.js';
import { body, param } from 'express-validator';

class AreaValidator {
 
  validateArea = [
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('name').isString().withMessage('El nombre debe ser una cadena de texto')
  ];


  validateAreaId = [
    param('id').notEmpty().withMessage('El id es requerido'),
    param('id').isInt().withMessage('El id debe ser un número'),
    param('id').custom(async (id) => {
      if (!id) {
        throw new Error('El parámetro id es requerido para la verificación');
      }
      if (isNaN(Number(id))) {
        throw new Error(`El parámetro id: ${id} debe ser un número`);
      }
      // Consulta al servicio para verificar que el registro existe
      const { status } = await AreaServices.getById(Number(id));
      if (status === 404) {
        throw new Error('El id no se encuentra en los registros');
      }
      return true;
    }),
  ];


  validateIfNameIsUse = async (req, res, next) => {
    const { id } = req.params;  // ID del registro (solo existe en PUT)
    const { name } = req.body;   // Nombre a verificar
    
    
    const { status, message, data } = await AreaServices.getByName(name);
    
    if (status == 500) {
      res.status(status).json({
        message,
      });
      return;
    } 
    // Si el nombre existe (status 200)
    else if (status == 200) {
      const area = data.area;
      
      // Si es POST (crear nuevo registro) y el nombre existe, rechaza
      if (!id) {
        res.status(400).json({
          errors: [
            {
              type: 'field',
              msg: `Nombre en uso: ${area}, para el nuevo registro`,
              path: 'name',
              location: 'body',
            },
          ],
        });
        return;
      } 
      // Si es PUT (actualizar) y el nombre pertenece a otro registro, rechaza
      else {
        if (id != area.id) {
          res.status(400).json({
            errors: [
              {
                type: 'field',
                msg: `Nombre en uso: ${area}, para el registro actual`,
                path: 'name',
                location: 'body',
              },
            ],
          });
          return;
        }
        // Si el nombre pertenece al mismo registro, permite continuar
      }
    }
    // Si el email no existe (status 404) o todo está bien, continúa
    next();
  };
}

export { AreaValidator };

