import { Post } from "./post.model";

export interface GridCard {
  id: string;
  title: string;
  listChildItem: Post[];
}