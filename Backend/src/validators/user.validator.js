

import { UserServices } from '../servicios/user.servicios.js';
import { body, param } from 'express-validator';

class UserValidator {
 
  validateUsers = [
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('name').isString().withMessage('El nombre debe ser una cadena de texto')
  ];


  validateUsersId = [
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
      const { status } = await UserServices.getById(Number(id));
      if (status === 404) {
        throw new Error('El id no se encuentra en los registros');
      }
      return true;
    }),
  ];


  validateIfEmailIsUse = async (req, res, next) => {
    const { id } = req.params;  // ID del registro (solo existe en PUT)
    const { email } = req.body;   // Nombre a verificar
    
    
    const { status, message, data } = await UserServices.getByEmail(email);
    
    if (status == 500) {
      res.status(status).json({
        message,
      });
      return;
    } 
    // Si el nombre existe (status 200)
    else if (status == 200) {
      const userFound = data.user;
      
      // Si es POST (crear nuevo registro) y el nombre existe, rechaza
      if (!id) {
        res.status(400).json({
          errors: [
            {
              type: 'field',
              msg: `Email en uso: ${email}, para el nuevo registro`,
              path: 'email',
              location: 'body',
            },
          ],
        });
        return;
      } 
      // Si es PUT (actualizar) y el nombre pertenece a otro registro, rechaza
      else {
        if (Number(id) != userFound.id) {
          res.status(400).json({
            errors: [
              {
                type: 'field',
                msg: `Email en uso: ${email}, para el registro actual`,
                path: 'email',
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

export { UserValidator };

