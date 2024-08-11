import { LanguageInfo } from '../models/company.model';
import CompanyController from '../controllers/company.controller';
import ValidationService from '../services/validation.service';
import express, { Request, Response } from 'express';
import { body, param } from 'express-validator';
import { Language } from '@/models/common.model';

const router = express.Router();

router.get('/', async (request: Request, response: Response)=>{

    const params = {
        page: +(request.query['page'] || 1),
        order: request.query['order']?.toString() || '',
        companyName: request.query['companyName']?.toString() || '',
        startDate: request.query['startDate'] ? new Date(request.query['startDate']?.toString()) : null,
        endDate: request.query['endDate'] ? new Date(request.query['endDate']?.toString()) : null,
        pageSize: +(request.query['pageSize'] || 10)
      };
    const language = request.headers['locale']?.toString() || 'vi';
    const companyResult = await CompanyController.getAllCompany(params,language);
    response.status(200).send(companyResult);
});

router.get('/language/:id', [
    param('id').notEmpty().withMessage(JSON.stringify({ message: 'Field Id is required.', translateKey: 'id_required' }))
], ValidationService.handleValidationErrors, async (request: Request, response: Response)=>{
    const id = request.params['id'];
    const language = request.headers['locale']?.toString() || 'vi';
    const companyResult = await CompanyController.getCompanyByIdWithLanguage(id, language);
    response.status(200).send(companyResult);
});

router.get('/:id',[
    param('id').notEmpty().withMessage(JSON.stringify({ message: 'Field Id is required.', translateKey: 'id_required' }))
], ValidationService.handleValidationErrors, async (request: Request, response: Response)=>{
    const id = request.params['id'];
    const companyResult = await CompanyController.getCompanyById(id);
    response.status(200).send(companyResult);
});

router.post('/',[
    body('languages').isArray({min: 1}).withMessage(JSON.stringify({ message: 'Field languages is required.', translateKey: 'languages_required' })).custom((value, { req }) => {
        const hasFieldError = value.find((item: Language<LanguageInfo>)=>!item.languageCode.trim() || !item.data.address.trim() || !item.data.description.trim() ||!item.name.trim() || !item.data.shortDescription);
        if(hasFieldError) {
            throw new Error(JSON.stringify({ message: 'The field of multiple language is incorrect.', translateKey: 'multiple_language_required' }));
        }
        return true;
    }),
    body('thumbnailUrl').notEmpty().withMessage(JSON.stringify({ message: 'Field thumbnailUrl is required.', translateKey: 'thumbnailUrl_required' })),
    body('images').isArray({min: 1}).withMessage(JSON.stringify({ message: 'Field images is required.', translateKey: 'images_required' })),
    body('startDate').notEmpty().withMessage(JSON.stringify({ message: 'Field startDate is required.', translateKey: 'startDate_required' })),
    body('endDate').notEmpty().withMessage(JSON.stringify({ message: 'Field endDate is required.', translateKey: 'endDate_required' }))
], ValidationService.handleValidationErrors, async (request: Request, response: Response)=>{
    const body = request.body;
    const companyResult = await CompanyController.createCompany(body);
    response.status(200).send(companyResult);
});
router.put('/:id', [
    body('languages').isArray({min: 1}).withMessage(JSON.stringify({ message: 'Field languages is required.', translateKey: 'languages_required' })).custom((value, { req }) => {
        const hasFieldError = value.find((item: Language<LanguageInfo>)=>!item.languageCode.trim() || !item.data.address.trim() || !item.data.description.trim() ||!item.name.trim() || !item.data.shortDescription);
        if(hasFieldError) {
            throw new Error(JSON.stringify({ message: 'The field of multiple language is incorrect.', translateKey: 'multiple_language_required' }));
        }
        return true;
    }),
    body('thumbnailUrl').notEmpty().withMessage(JSON.stringify({ message: 'Field thumbnailUrl is required.', translateKey: 'thumbnailUrl_required' })),
    body('images').isArray({min: 1}).withMessage(JSON.stringify({ message: 'Field images is required.', translateKey: 'images_required' })),
    body('startDate').notEmpty().withMessage(JSON.stringify({ message: 'Field startDate is required.', translateKey: 'startDate_required' })),
    body('endDate').notEmpty().withMessage(JSON.stringify({ message: 'Field endDate is required.', translateKey: 'endDate_required' }))
], ValidationService.handleValidationErrors, async (request: Request, response: Response)=>{
    const body = request.body;
    const id = request.params['id'];
    const companyResult = await CompanyController.updateCompany(id, body);
    response.status(200).send(companyResult);
});
router.delete('/:id', async (request: Request, response: Response)=>{
    const id = request.params['id'];
    const companyResult = await CompanyController.deleteCompany(id);
    response.status(200).send(companyResult);
});

export default router;