import mongoose, { Schema, Document } from 'mongoose';
import { Language } from './common.model';

export interface LinkDetailWithLanguage {
  id: string;
  icon: string;
  link: string;
  sortNo: number;
  description: string;
  name: string;
}
export interface LanguageInfo {
    description: string;
    name: string;
}
// Define interface for TypeScript type-checking
export interface Link extends Document {
  id: string,
  icon: string;
  link: string;
  sortNo: number;
  languages: Language<LanguageInfo>[];
}

// Define Mongoose schema for Link model
const LinkSchema: Schema = new Schema({
    icon: { type: String},
    link: [{ type: String, required: true }],
    sortNo: { type: Number, required: true },
    languages: {
        type: Array<Language<LanguageInfo>>,
        required: true
    }, 
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Define and export the Link model based on schema
const LinkModel = mongoose.model<Link>('link', LinkSchema);

export default LinkModel;