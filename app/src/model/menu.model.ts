export interface MenuItem {
  id: string;
  lable: string;
  url: string;
  showOrHidden: boolean;
  alias?: string;
  icon?: string;
  children?: MenuItem[];
  role?: number[];
}