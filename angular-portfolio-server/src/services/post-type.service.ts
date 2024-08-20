import PostTypeModel, { LanguageInfo, PostType, PostTypeDetailWithLanguage } from "../models/post-type.model";
import { Language } from "../models/common.model";
import { getUTCDate } from "../utils/date.util";

export default class PostTypeService {
  public static async getByIdWithLanguage(id: string, locale: string): Promise<PostTypeDetailWithLanguage | null> {
    const result = await PostTypeModel.findById(id);
    const defaultLanguage = result?.languages.find((item:Language<LanguageInfo>)=>item.isDefault);
    const languageInfo = result?.languages.find((item:Language<LanguageInfo>)=>item.languageCode === locale) || defaultLanguage;
    return {
      id: result?._id?.toString() || '',
      name: languageInfo?.data.name || '',
      description: languageInfo?.data.description || ''
  };
  }

  public static async getById(id: string): Promise<PostType | null> {
    const result = await PostTypeModel.findById(id);
    return result;
  }

  public static async create(body: PostType): Promise<PostType | null> {
    const createResult = await PostTypeModel.create(body);
    return createResult;
  }

  public static async update(id: string, body: PostType): Promise<PostType | null> {
    const updatedResult = await PostTypeModel.findByIdAndUpdate(id, { ...body, updatedAt: getUTCDate(new Date()) }, { new: true });
    return updatedResult;
  }

  public static async delete(id: string): Promise<void> {
    await PostTypeModel.findByIdAndDelete(id);
  }
}