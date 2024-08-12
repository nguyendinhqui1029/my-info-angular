import LinkService from '../services/link.service';
import { ApiResponseValue, ErrorResponse } from '../models/response-value.model';
import { Link, LinkDetailWithLanguage } from '../models/link.model';

export default class LinkController {

  public static getByIdWithLanguage = async (id: string, locale: string): Promise<ApiResponseValue<LinkDetailWithLanguage | ErrorResponse[]>> => {
    try {
      const result = await LinkService.getByIdWithLanguage(id, locale);
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

  public static getById = async (id: string): Promise<ApiResponseValue<Link | ErrorResponse[]>> => {
    try {
      const result = await LinkService.getById(id);
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

  public static create = async (body: Link): Promise<ApiResponseValue<Link | ErrorResponse[]>> => {
    try {
      const createResult = await LinkService.create(body);
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

  public static update = async (id: string, body: Link): Promise<ApiResponseValue<Link | ErrorResponse[]>> => {
    try {
      const updatedUser = await LinkService.update(id, body);
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

  public static delete = async (id: string): Promise<ApiResponseValue<Link | ErrorResponse[]>> => {
    try {
      await LinkService.delete(id);
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
