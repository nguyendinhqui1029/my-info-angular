import PostTypeService from '../services/post-type.service';
import { ApiResponseValue, ErrorResponse } from '../models/response-value.model';
import { PostType, PostTypeDetailWithLanguage } from '../models/post-type.model';

export default class PostTypeController {

  public static getByIdWithLanguage = async (id: string, locale: string): Promise<ApiResponseValue<PostTypeDetailWithLanguage | ErrorResponse[]>> => {
    try {
      const result = await PostTypeService.getByIdWithLanguage(id, locale);
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
        data: [{ message: error, translateKey: 'server_error' }]
      }
    }
  };

  public static getById = async (id: string): Promise<ApiResponseValue<PostType | ErrorResponse[]>> => {
    try {
      const result = await PostTypeService.getById(id);
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

  public static create = async (body: PostType): Promise<ApiResponseValue<PostType | ErrorResponse[]>> => {
    try {
      const createResult = await PostTypeService.create(body);
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

  public static update = async (id: string, body: PostType): Promise<ApiResponseValue<PostType | ErrorResponse[]>> => {
    try {
      const updatedUser = await PostTypeService.update(id, body);
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

  public static delete = async (id: string): Promise<ApiResponseValue<PostType | ErrorResponse[]>> => {
    try {
      await PostTypeService.delete(id);
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
