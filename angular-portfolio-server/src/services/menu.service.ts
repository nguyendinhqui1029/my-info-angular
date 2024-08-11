import { getUTCDate } from "../utils/date.util";
import { Language } from "../models/common.model";
import MenuModel, { MenuItem, MenuItemByLanguage, MenuRequestParams } from "../models/menu.model";

class MenuService {
  public static async getAll(params: MenuRequestParams, language: string): Promise<{total: number, data: MenuItemByLanguage[]}> {
    const query = {
      languages: {
        $elemMatch: {
          languageCode: language,
          name: { $regex: params.name.trim(), $options: 'i' }
        }
      }
    };
    const totalCount = await MenuModel.countDocuments(query).exec();
    const result = await MenuModel.find(query).skip((params.page - 1) * params.pageSize)
    .limit(params.pageSize)
    .exec();
    return {
      total: totalCount,
      data: result.map((item: MenuItem)=>{
        const itemByLanguage = item.languages.find((langItem: Language<{name: string}>)=>langItem.languageCode === language);
        return {
          id: item._id,
          name: itemByLanguage?.data?.name || '',
          languageCode: itemByLanguage?.languageCode || '',
          isDefault: itemByLanguage?.isDefault || false,
          path: item.path || '',
          icon: item.icon || '',
          role: item.role || 0,
          rootId: item.rootId || null
        };
      }) as MenuItemByLanguage[] || []
      };
  }

  public static async getById(id: string): Promise<MenuItem | null> {
    const result = await MenuModel.findById(id);
    return result;
  }

  public static async create(body: MenuItem): Promise<MenuItem | null> {
    const createResult = await MenuModel.create(body);
    return createResult;
  }

  public static async update(id: string, body: MenuItem): Promise<MenuItem | null> {
    const updatedResult = await MenuModel.findByIdAndUpdate(id, {...body, updatedAt: getUTCDate(new Date())}, { new: true });
    return updatedResult;
  }

  public static async delete(id: string): Promise<void> {
    await MenuModel.findByIdAndDelete(id);
  }
}

export default MenuService;