import { Router } from 'express';
import { AreaController } from '../controladores/area.controladores.js';
import { validateFields } from '../middlewares/validate-fields.middleware.js';
import { AreaValidator } from '../validators/area.validator.js';


const router = Router();
const area_controller = new AreaController();
const area_validator = new AreaValidator();
router.get('/', area_controller.getAll);
router.get('/:id', area_controller.getOne);
//obtener por nombre
router.get('/name/:name', area_controller.getByName);

router.post('/', 
    ...area_validator.validateArea, 
    validateFields,                     
    area_validator.validateIfNameIsUse,
    area_controller.created);

router.put('/:id',
    ...area_validator.validateAreaId,  
    ...area_validator.validateArea,   
    validateFields,                    
    area_validator.validateIfNameIsUse, 
    area_controller.updated);

router.delete('/:id',
    ...area_validator.validateAreaId, 
    validateFields,                   
    area_controller.deleted);

export default router;
