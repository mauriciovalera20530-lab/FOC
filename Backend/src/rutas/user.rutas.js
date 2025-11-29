import { Router } from 'express';
import { UserController } from '../controladores/user.controladores.js';
import { validateFields } from '../middlewares/validate-fields.middleware.js';
import { UserValidator } from '../validators/user.validator.js';


const router = Router();
const user_controller = new UserController();
const users_validator = new UserValidator();
router.get('/', user_controller.getAll);
router.get('/email/:email', user_controller.getByEmail);
router.get('/:id', user_controller.getOne);


router.post('/', 
    ...users_validator.validateUsers, 
    validateFields,                     
    users_validator.validateIfEmailIsUse,
    user_controller.created);

router.put('/:id',
    ...users_validator.validateUsersId,  
    ...users_validator.validateUsers,   
    validateFields,                    
    users_validator.validateIfEmailIsUse, 
    user_controller.updated);

router.delete('/:id',
    ...users_validator.validateUsersId, 
    validateFields,                   
    user_controller.deleted);

export default router;
