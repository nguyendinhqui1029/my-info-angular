import PersonalInformationModel, { LanguageInfo, PersonalInformation, PersonalInformationByLanguage } from "../models/personal-info.model";
import { Language } from "../models/common.model";
import { getUTCDate } from "../utils/date.util";

export default class PersonalInformationService {
  public static async getByIdWithLanguage(id: string, locale: string): Promise<PersonalInformationByLanguage | null> {
    const result = await PersonalInformationModel.findById(id);
    const defaultLanguage = result?.languages.find((item:Language<LanguageInfo>)=>item.isDefault);
    const languageInfo = result?.languages.find((item:Language<LanguageInfo>)=>item.languageCode === locale) || defaultLanguage;
    return {
      id: result?._id?.toString() || '',
      socialId: result?.socialId || [],
      contactId: result?.contactId || [],
      cvLink: result?.cvLink || '',
      avatar: result?.avatar || '',
      name: languageInfo?.data.name || '',
      aboutMyself: languageInfo?.data.name || '',
      experience: languageInfo?.data.experience || 0,
      projects: languageInfo?.data.projects || 0,
      company: languageInfo?.data.company || 0,
      aboutMyJob: languageInfo?.data.aboutMyJob || '',
      position: languageInfo?.data.position || '',
  };
  }

  public static async getById(id: string): Promise<PersonalInformation | null> {
    const result = await PersonalInformationModel.findById(id);
    return result;
  }

  public static async create(body: PersonalInformation): Promise<PersonalInformation | null> {
    const createResult = await PersonalInformationModel.create(body);
    return createResult;
  }

  public static async update(id: string, body: PersonalInformation): Promise<PersonalInformation | null> {
    const updatedResult = await PersonalInformationModel.findByIdAndUpdate(id, { ...body, updatedAt: getUTCDate(new Date()) }, { new: true });
    return updatedResult;
  }

  public static async delete(id: string): Promise<void> {
    await PersonalInformationModel.findByIdAndDelete(id);
  }
}