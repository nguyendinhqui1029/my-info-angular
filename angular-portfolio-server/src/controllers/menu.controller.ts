import MenuService from '../services/menu.service';
import { MenuItem, MenuItemByLanguage, MenuRequestParams } from '../models/menu.model';
import { ApiResponseValue, ErrorResponse } from '../models/response-value.model';

class MenuController {


  public static getAllMenu = async (params: MenuRequestParams, language: string): Promise<ApiResponseValue<MenuItemByLanguage[] | ErrorResponse[]>> => {
    try {
      const {total, data} = await MenuService.getAll(params, language);
      return {
        statusCode: 200,
        statusText: 'Get all is successful.',
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


  public static getById = async (id: string): Promise<ApiResponseValue<MenuItem | ErrorResponse[]>> => {
    try {
      const result = await MenuService.getById(id);
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

  public static create = async (body: MenuItem): Promise<ApiResponseValue<MenuItem | ErrorResponse[]>> => {
    try {
      const createResult = await MenuService.create(body);
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

  public static update = async (id: string, body: MenuItem): Promise<ApiResponseValue<MenuItem | ErrorResponse[]>> => {
    try {
      const updatedUser = await MenuService.update(id, body);
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

  public static delete = async (id: string): Promise<ApiResponseValue<MenuItem | ErrorResponse[]>> => {
    try {
      await MenuService.delete(id);
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

export default MenuController;