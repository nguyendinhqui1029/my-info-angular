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

export interface CompanyRequestBody {
    id?: string;
    name: string;
    address: string;
    description: string;
    shortDescription: string;
    thumbnailUrl: string;
    startDate: number;
    endDate: number;
    images: string[];
    activities: Banner[];
}