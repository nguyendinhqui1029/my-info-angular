export interface MenuItem {
    id: string;
    name: string;
    path: string;
    icon?: string;
    isActive: boolean;
}

export interface AdminMenu extends MenuItem{
  children: MenuItem[];
}