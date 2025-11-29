import { Router } from 'express';
import { ProductController } from '../controladores/product.controladores.js'; 
import { validateFields } from '../middlewares/validate-fields.middleware.js';
import { ProductValidator } from '../validators/product.validator.js'; 

const router = Router();
const productController = new ProductController();
const productValidator = new ProductValidator();

// --- RUTAS GET ---

// Obtener todos
router.get('/', productController.getAll);

// Obtener por nombre
router.get('/name/:name', productController.getByName);


// Obtener uno
router.get('/:id', productController.getOne);
// --- RUTAS POST ---

router.post('/',
    ...productValidator.validateProduct, 
    validateFields,
    productValidator.validateIfNameIsUse,
    productController.create
);


// --- RUTAS PUT ---

router.put('/:id',
    ...productValidator.validateProductId,
    ...productValidator.validateProduct,
    validateFields,
    productValidator.validateIfNameIsUse,
    productController.update
);


// --- RUTAS DELETE ---

router.delete('/:id',
    ...productValidator.validateProductId,
    validateFields,
    productController.delete
);

export default router;