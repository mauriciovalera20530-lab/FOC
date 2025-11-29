
import { Router } from 'express';
import { CategoriesController } from '../controladores/categories.controladores.js';
import { validateFields } from '../middlewares/validate-fields.middleware.js';
import { CategoriesValidator } from '../validators/categories.validator.js';


const router = Router();
const categories_controller= new CategoriesController();
const categories_validator = new CategoriesValidator();


router.get('/', categories_controller.getAll)
//obtener uno
router.get('/:id',categories_controller.getOne)
//obtener por nombre
router.get('/name/:name', categories_controller.getByName)
//post
router.post('/',
    ...categories_validator.validateCategory,
    validateFields,
    categories_validator.validateIfNameIsUse,
    categories_controller.create)
//put
router.put('/:id',
    ...categories_validator.validateCategory,
    ...categories_validator.validateCateId,
    validateFields,
    categories_validator.validateIfNameIsUse,
    categories_controller.update)
//delete
router.delete('/:id',
    ...categories_validator.validateCateId,
    validateFields,
    categories_controller.delete)
export default router;