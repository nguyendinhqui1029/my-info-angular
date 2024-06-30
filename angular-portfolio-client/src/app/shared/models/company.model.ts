import { Banner } from "@shared/models/banner.model";

export interface Company {
    id: string;
    name: string;
    address: string;
    description: string;
    shortDescription: string;
    thumbnailUrl: string;
    images: string[];
    activities: Banner[]
}