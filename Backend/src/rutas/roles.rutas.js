
import { Router } from 'express';
import { RoleController } from '../controladores/roles.controladores.js';
import { validateFields } from '../middlewares/validate-fields.middleware.js';
import { RolesValidator } from '../validators/roles.validator.js';


const router = Router();
const role_controller= new RoleController();
const role_validator = new RolesValidator();

//Rutas de roles
//obtener una lista
router.get('/', role_controller.getAll)
//obtener uno
router.get('/:id',role_controller.getOne)
//obtener por nombre
router.get('/name/:name', role_controller.getByName)
//post
router.post('/',
    ...role_validator.validateRol,
    validateFields,
    role_validator.validateIfNameIsUse,
    role_controller.created)
//put
router.put('/:id',
    ...role_validator.validateRol,
    ...role_validator.validateRolId,
    validateFields,
    role_validator.validateIfNameIsUse,
    role_controller.updated)
//delete
router.delete('/:id',
    ...role_validator.validateRolId,
    validateFields,
    role_controller.deleted)
export default router;