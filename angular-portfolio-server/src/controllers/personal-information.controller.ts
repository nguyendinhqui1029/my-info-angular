import PersonalInformationService from '../services/personal-information.service';
import { PersonalInformation, PersonalInformationByLanguage } from '../models/personal-info.model';
import { ApiResponseValue, ErrorResponse } from '../models/response-value.model';

export default class PersonalInformationController {

  public static getByIdWithLanguage = async (id: string, locale: string): Promise<ApiResponseValue<PersonalInformationByLanguage | ErrorResponse[]>> => {
    try {
      const result = await PersonalInformationService.getByIdWithLanguage(id, locale);
      return {
        statusCode: 200,
        statusText: 'Get item by id is successful.',
        totalCount: 0,
        page: 0,
        data: result
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

  public static getById = async (id: string): Promise<ApiResponseValue<PersonalInformation | ErrorResponse[]>> => {
    try {
      const result = await PersonalInformationService.getById(id);
      return {
        statusCode: 200,
        statusText: 'Get item by id is successful.',
        totalCount: 0,
        page: 0,
        data: result
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

  public static create = async (body: PersonalInformation): Promise<ApiResponseValue<PersonalInformation | ErrorResponse[]>> => {
    try {
      const createResult = await PersonalInformationService.create(body);
      return {
        statusCode: 200,
        statusText: 'Create is successful.',
        totalCount: 0,
        page: 0,
        data: createResult
      }
    } catch (error: any) {
      return {
        statusCode: 500,
        statusText: 'Something is wrong.',
        totalCount: 0,
        page: 0,
        data: [{ message: error, translateKey: 'server_error' }]
      }
    }
  };

  public static update = async (id: string, body: PersonalInformation): Promise<ApiResponseValue<PersonalInformation | ErrorResponse[]>> => {
    try {
      const updatedUser = await PersonalInformationService.update(id, body);
      return {
        statusCode: 200,
        statusText: 'Update is successful.',
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
        data: [{ message: error, translateKey: 'server_error' }]
      }
    }
  };

  public static delete = async (id: string): Promise<ApiResponseValue<PersonalInformation | ErrorResponse[]>> => {
    try {
      await PersonalInformationService.delete(id);
      return {
        statusCode: 200,
        statusText: 'Delete is successful.',
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
