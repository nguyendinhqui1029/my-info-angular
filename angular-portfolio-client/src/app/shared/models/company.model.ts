import { Banner } from "@shared/models/banner.model";

export interface CompanyResponseValue {
    id: string;
    name: string;
    address: string;
    description: string;
    shortDescription: string;
    thumbnailUrl: string;
    images: string[];
    activities: Banner[];
    startDate: number;
    endDate: number;
}

export interface LanguageForm { 
    companyName: string; 
    companyAddress: string; 
    description: string; 
    shortDescription: string 
}
export interface LanguageInfoRequestBody {
    languageCode: string;
    isDefault: boolean;
    name: string;
    address: string;
    description: string;
    shortDescription: string;
}
export interface CompanyRequestBody {
    id?: string;
    thumbnailUrl: string;
    images: string[];
    startDate: number;
    endDate: number;
    languages: LanguageInfoRequestBody[];
}