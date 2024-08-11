import { Company, CompanyDetailWithLanguage, CompanyRequestParams, LanguageInfo } from '../models/company.model';
import { ApiResponseValue, ErrorResponse } from '../models/response-value.model';
import CompanyService from '../services/company.service';

class CompanyController {


  public static getAllCompany = async (params: CompanyRequestParams, language: string): Promise<ApiResponseValue<CompanyDetailWithLanguage[] | ErrorResponse[]>> => {
    try {
      const {total, data} = await CompanyService.getAllCompany(params, language);
      return {
        statusCode: 200,
        statusText: 'Get company is successful.',
        totalCount: total,
        page: params.page,
        data: data || []
      }
    } catch (error: any) {
      return {
        statusCode: 500,
        statusText: 'Something is wrong.',
        totalCount: 0,
        page: 0,
        data: [{ message: 'Server error', translateKey: 'server_error' }]
      }
    }
  };

  public static getCompanyByIdWithLanguage = async (id: string, language: string): Promise<ApiResponseValue<CompanyDetailWithLanguage | ErrorResponse[]>> => {
    try {
      const company = await CompanyService.getCompanyByIdWithLanguage(id, language);
      return {
        statusCode: 200,
        statusText: 'Get company by id is successful.',
        totalCount: 0,
        page: 0,
        data: company
      }
    } catch (error: any) {
      return {
        statusCode: 500,
        statusText: 'Something is wrong.',
        totalCount: 0,
        page: 0,
        data: [{ message: 'Server error', translateKey: 'server_error' }]
      }
    }
  };

  public static getCompanyById = async (id: string): Promise<ApiResponseValue<Company | ErrorResponse[]>> => {
    try {
      const company = await CompanyService.getCompanyById(id);
      return {
        statusCode: 200,
        statusText: 'Get company by id is successful.',
        totalCount: 0,
        page: 0,
        data: company
      }
    } catch (error: any) {
      return {
        statusCode: 500,
        statusText: 'Something is wrong.',
        totalCount: 0,
        page: 0,
        data: [{ message: 'Server error', translateKey: 'server_error' }]
      }
    }
  };

  public static createCompany = async (body: Company): Promise<ApiResponseValue<Company | ErrorResponse[]>> => {
    try {
      const company = await CompanyService.createCompany(body);
      return {
        statusCode: 200,
        statusText: 'Create company is successful.',
        totalCount: 0,
        page: 0,
        data: company
      }
    } catch (error: any) {
      return {
        statusCode: 500,
        statusText: 'Something is wrong.',
        totalCount: 0,
        page: 0,
        data: [{ message: 'Server error', translateKey: 'server_error' }]
      }
    }
  };

  public static updateCompany = async (id: string, body: Company): Promise<ApiResponseValue<Company | ErrorResponse[]>> => {
    try {
      const updatedUser = await CompanyService.updateCompany(id, body);
      return {
        statusCode: 200,
        statusText: 'Update company is successful.',
        totalCount: 0,
        page: 0,
        data: updatedUser
      }
    } catch (error: any) {
      return {
        statusCode: 500,
        statusText: 'Something is wrong.',
        totalCount: 0,
        page: 0,
        data: [{ message: 'Server error', translateKey: 'server_error' }]
      }
    }
  };

  public static deleteCompany = async (id: string): Promise<ApiResponseValue<Company | ErrorResponse[]>> => {
    try {
      await CompanyService.deleteCompany(id);
      return {
        statusCode: 200,
        statusText: 'Delete company is successful.',
        totalCount: 0,
        page: 0,
        data: null
      }
    } catch (error: any) {
     return {
        statusCode: 500,
        statusText: 'Something is wrong.',
        totalCount: 0,
        page: 0,
        data: [{ message: 'Server error', translateKey: 'server_error' }]
      }
    }
  };
}

export default CompanyController;