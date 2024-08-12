import LinkController from '../controllers/link.controller';
import ValidationService from '../services/validation.service';
import express, { Request, Response } from 'express';
import { body, param } from 'express-validator';

const router = express.Router();

router.get('/language/:id', async (request: Request, response: Response)=>{
    const language = request.headers['locale']?.toString() || 'vi';
    const result = await LinkController.getByIdWithLanguage(request.params['id'], language);
    response.status(200).send(result);
});


router.get('/:id',[
    param('id').notEmpty().withMessage(JSON.stringify({ message: 'Field Id is required.', translateKey: 'id_required' }))
], ValidationService.handleValidationErrors, async (request: Request, response: Response)=>{
    const id = request.params['id'];
    const result = await LinkController.getById(id);
    response.status(200).send(result);
});

router.post('/', async (request: Request, response: Response)=>{
    const body = request.body;
    const result = await LinkController.create(body);
    response.status(200).send(result);
});

router.put('/:id', async (request: Request, response: Response)=>{
    const body = request.body;
    const id = request.params['id'];
    const result = await LinkController.update(id, body);
    response.status(200).send(result);
});

router.delete('/:id', async (request: Request, response: Response)=>{
    const id = request.params['id'];
    const result = await LinkController.delete(id);
    response.status(200).send(result);
});

export default router;