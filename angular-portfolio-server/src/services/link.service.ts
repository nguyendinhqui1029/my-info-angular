import LinkModel, { LanguageInfo, Link, LinkDetailWithLanguage } from "../models/link.model";
import { Language } from "../models/common.model";
import { getUTCDate } from "../utils/date.util";

export default class LinkService {
  public static async getByIdWithLanguage(id: string, locale: string): Promise<LinkDetailWithLanguage | null> {
    const result = await LinkModel.findById(id);
    const defaultLanguage = result?.languages.find((item:Language<LanguageInfo>)=>item.isDefault);
    const languageInfo = result?.languages.find((item:Language<LanguageInfo>)=>item.languageCode === locale) || defaultLanguage;
    return {
      id: result?._id?.toString() || '',
      icon: result?.icon || '',
      link: result?.link || '',
      sortNo: result?.sortNo || 0,
      name: languageInfo?.data.name || '',
      description: languageInfo?.data.description || ''
  };
  }

  public static async getById(id: string): Promise<Link | null> {
    const result = await LinkModel.findById(id);
    return result;
  }

  public static async create(body: Link): Promise<Link | null> {
    const createResult = await LinkModel.create(body);
    return createResult;
  }

  public static async update(id: string, body: Link): Promise<Link | null> {
    const updatedResult = await LinkModel.findByIdAndUpdate(id, { ...body, updatedAt: getUTCDate(new Date()) }, { new: true });
    return updatedResult;
  }

  public static async delete(id: string): Promise<void> {
    await LinkModel.findByIdAndDelete(id);
  }
}