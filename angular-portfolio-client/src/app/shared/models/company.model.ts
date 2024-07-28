
export interface CompanyRequestParams {
    page: number;
    pageSize: number;
    order: string;
    companyName: string;
    startDate: Date | null;
    endDate: Date | null;
}
export interface LanguageResponseValue {
    languageCode: string;
    isDefault: boolean;
    name: string;
    address: string;
    description: string;
    shortDescription: string;
}

export interface CompanyDetailWithLanguageResponseValue {
    id: string;
    thumbnailUrl: string;
    images: string[];
    startDate: string;
    endDate: string;
    name: string;
    address: string;
    description: string;
    shortDescription: string;
}
export interface CompanyResponseValue {
    id: string;
    thumbnailUrl: string;
    images: string[];
    startDate: string;
    endDate: string;
    languages: LanguageResponseValue[];
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
    startDate: string;
    endDate: string;
    languages: LanguageInfoRequestBody[];
}