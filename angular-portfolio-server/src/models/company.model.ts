import mongoose, { Schema, Document } from 'mongoose';

export interface CompanyRequestParams {
  page: number;
  order: string;
  companyName: string;
  startDate: Date | null;
  endDate: Date | null;
  pageSize: number;
}

export interface LanguageInfo {
  name: string;
  address: string;
  description: string;
  shortDescription: string;
  languageCode: string;
  isDefault: boolean;
}

export interface CompanyDetailWithLanguage {
  id: string;
  thumbnailUrl: string;
  images: string[];
  startDate: Date | null;
  endDate: Date | null;
  name: string;
  address: string;
  description: string;
  shortDescription: string;
  languageCode: string;
  isDefault: boolean;
}

// Define interface for TypeScript type-checking
export interface Company extends Document {
  id: string,
  thumbnailUrl: string;
  images: string[];
  startDate: Date | null;
  endDate: Date | null;
  languages: LanguageInfo[];
}

// Define Mongoose schema for Company model
const CompanySchema: Schema = new Schema({
  thumbnailUrl: { type: String, required: true },
  images: [{ type: String }],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  languages: {
    type: Array<LanguageInfo>,
    required: true
  }, 
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Define and export the Company model based on schema
const CompanyModel = mongoose.model<Company>('company', CompanySchema);

export default CompanyModel;