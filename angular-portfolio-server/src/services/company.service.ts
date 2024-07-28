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

  public static async getCompanyById(id: string): Promise<Company | null> {
    const company = await CompanyModel.findById(id);
    return company;
  }

  public static async createCompany(companyModel: Company): Promise<any> {
    const newCompany = await CompanyModel.create(companyModel);
    return newCompany;
  }

  public static async updateCompany(id: string, userData: any): Promise<any | null> {
    const updatedCompany = await CompanyModel.findByIdAndUpdate(id, userData, { new: true });
    return updatedCompany;
  }

  public static async deleteCompany(id: string): Promise<void> {
    await CompanyModel.findByIdAndDelete(id);
  }
}

export default CompanyService;