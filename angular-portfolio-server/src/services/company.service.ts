import CompanyModel, { Company, CompanyDetailWithLanguage, CompanyRequestParams, LanguageInfo } from "../models/company.model";

class CompanyService {
  public static async getAllCompany(params: CompanyRequestParams, language: string): Promise<{total: number, data: CompanyDetailWithLanguage[]}> {
    const query = {
      languages: {
        $elemMatch: {
          languageCode: language,
          name: { $regex: params.companyName.trim(), $options: 'i' }
        }
      }
    };
    const totalCount = await CompanyModel.countDocuments(query).exec();
    const company = await CompanyModel.find(query).skip((params.page - 1) * params.pageSize)
    .limit(params.pageSize)
    .exec();
    return {
      total: totalCount,
      data: company.map((item: Company)=>{
        const itemByLanguage = item.languages.find((langItem: LanguageInfo)=>langItem.languageCode === language);
        return {
          id: item._id,
          thumbnailUrl: item.thumbnailUrl || '',
          images: item.images || [],
          startDate: item.startDate || null,
          endDate: item.endDate || null,
          name: itemByLanguage?.name || '',
          address: itemByLanguage?.address || '',
          description: itemByLanguage?.description || '',
          shortDescription: itemByLanguage?.shortDescription || '',
          languageCode: itemByLanguage?.languageCode || '',
          isDefault: itemByLanguage?.isDefault || false
        } as CompanyDetailWithLanguage;
      }) || []
      };
  }

  public static async getCompanyByIdWithLanguage(id: string, language: string): Promise<CompanyDetailWithLanguage | null> {
    const company = await CompanyModel.findById(id);
    let valueByLanguage = company?.languages.find((item: LanguageInfo)=> item.languageCode === language);
    if(!valueByLanguage) {
      valueByLanguage = company?.languages.find((item: LanguageInfo)=> item.isDefault);
    }
    return {
      id: company?._id?.toString() || '',
      thumbnailUrl: company?.thumbnailUrl || '',
      images: company?.images || [],
      startDate: company?.startDate || null,
      endDate: company?.endDate || null,
      name: valueByLanguage?.name || '',
      address: valueByLanguage?.address || '',
      description: valueByLanguage?.description || '',
      shortDescription: valueByLanguage?.shortDescription || '',
      languageCode: valueByLanguage?.languageCode || '',
      isDefault: valueByLanguage?.isDefault || false
    } ;
  }

  public static async getCompanyById(id: string): Promise<Company | null> {
    const company = await CompanyModel.findById(id);
    return {
      id: company?._id?.toString() || '',
      thumbnailUrl: company?.thumbnailUrl || '',
      images: company?.images || [],
      startDate: company?.startDate || null,
      endDate: company?.endDate || null,
      languages: company?.languages|| []
    } as Company;
  }

  public static async createCompany(companyModel: Company): Promise<any> {
    const newCompany = await CompanyModel.create(companyModel);
    return newCompany;
  }

  public static async updateCompany(id: string, body: Company): Promise<any | null> {
    const updatedCompany = await CompanyModel.findByIdAndUpdate(id, body, { new: true });
    return updatedCompany;
  }

  public static async deleteCompany(id: string): Promise<void> {
    await CompanyModel.findByIdAndDelete(id);
  }
}

export default CompanyService;