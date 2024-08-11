import { MenuByLanguage } from '../models/menu.model';
import MenuController from '../controllers/menu.controller';
import ValidationService from '../services/validation.service';
import express, { Request, Response } from 'express';
import { body, param } from 'express-validator';

const router = express.Router();

router.get('/', async (request: Request, response: Response)=>{

    const params = {
        page: +(request.query['page'] || 1),
        order: request.query['order']?.toString() || '',
        name: request.query['name']?.toString() || '',
        startDate: request.query['startDate'] ? new Date(request.query['startDate']?.toString()) : null,
        endDate: request.query['endDate'] ? new Date(request.query['endDate']?.toString()) : null,
        pageSize: +(request.query['pageSize'] || 10)
      };
    const language = request.headers['locale']?.toString() || 'vi';
    const result = await MenuController.getAllMenu(params,language);
    response.status(200).send(result);
});


router.get('/:id',[
    param('id').notEmpty().withMessage(JSON.stringify({ message: 'Field Id is required.', translateKey: 'id_required' }))
], ValidationService.handleValidationErrors, async (request: Request, response: Response)=>{
    const id = request.params['id'];
    const result = await MenuController.getById(id);
    response.status(200).send(result);
});

router.post('/',[
    body('languages').isArray({min: 1}).withMessage(JSON.stringify({ message: 'Field languages is required.', translateKey: 'languages_required' })).custom((value, { req }) => {
        const hasFieldError = value.find((item: MenuByLanguage)=>!item.languageCode.trim() || !item.name.trim());
        if(hasFieldError) {
            throw new Error(JSON.stringify({ message: 'The field of multiple language is incorrect.', translateKey: 'multiple_language_required' }));
        }
        return true;
    }),
    body('path').notEmpty().withMessage(JSON.stringify({ message: 'Field path is required.', translateKey: 'path_required' })),
    body('role').notEmpty().withMessage(JSON.stringify({ message: 'Field role is required.', translateKey: 'role_required' })),
    body('sortNo').notEmpty().withMessage(JSON.stringify({ message: 'Field sortNo is required.', translateKey: 'sort_no_required' }))
], ValidationService.handleValidationErrors, async (request: Request, response: Response)=>{
    const body = request.body;
    const result = await MenuController.create(body);
    response.status(200).send(result);
});

router.put('/:id', [
    body('languages').isArray({min: 1}).withMessage(JSON.stringify({ message: 'Field languages is required.', translateKey: 'languages_required' })).custom((value, { req }) => {
        const hasFieldError = value.find((item: MenuByLanguage)=>!item.languageCode.trim() ||!item.name.trim());
        if(hasFieldError) {
            throw new Error(JSON.stringify({ message: 'The field of multiple language is incorrect.', translateKey: 'multiple_language_required' }));
        }
        return true;
    }),
    body('path').notEmpty().withMessage(JSON.stringify({ message: 'Field path is required.', translateKey: 'path_required' })),
    body('role').notEmpty().withMessage(JSON.stringify({ message: 'Field role is required.', translateKey: 'role_required' })),
    body('sortNo').notEmpty().withMessage(JSON.stringify({ message: 'Field sortNo is required.', translateKey: 'sort_no_required' }))
], ValidationService.handleValidationErrors, async (request: Request, response: Response)=>{
    const body = request.body;
    const id = request.params['id'];
    const result = await MenuController.update(id, body);
    response.status(200).send(result);
});
router.delete('/:id', async (request: Request, response: Response)=>{
    const id = request.params['id'];
    const result = await MenuController.delete(id);
    response.status(200).send(result);
});

export default router;