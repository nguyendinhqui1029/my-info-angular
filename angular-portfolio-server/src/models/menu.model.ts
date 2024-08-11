import { ObjectId } from './../../node_modules/bson/src/objectid';
import mongoose, { Schema, Document } from 'mongoose';

export interface MenuRequestParams {
    page: number;
    pageSize: number;
    name: string;
}
export interface MenuByLanguage {
    languageCode: string; 
    isDefault: boolean;
    name: string;
}
export interface MenuItem extends Document {
    path: string;
    icon?: string;
    role: number;
    sortNo: number;
    languages: MenuByLanguage[];
    rootId: string | null;
}

export interface MenuItemByLanguage extends Document {
    id: string;
    path: string;
    icon?: string;
    role: number;
    languageCode: string; 
    isDefault: boolean;
    name: string;
    sortNo: number;
    rootId: string | null;
}

const MenuSchema: Schema = new Schema({
    path: { type: String, required: true },
    icon: { type: String, required: true },
    role: { type: Number, required: true },
    rootId: { type: String },
    languages: {
        type: Array<MenuByLanguage>,
        required: true
    },
    sortNo: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Define and export the MenuModel based on schema
const MenuModel = mongoose.model<MenuItem>('Menu', MenuSchema);

export default MenuModel;