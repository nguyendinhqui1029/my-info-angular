import { CategoryModel } from "./category.model";

export class Post {
  id: string;
  title: string;
  subContent: string;
  contentDetail: string;
  urlVideo: string;
  urlThumnail?: string;
  date?: any;
  listImage?: any[];
  view?: number;
  status?: any;
  rating?: number;
  category?: string;
}