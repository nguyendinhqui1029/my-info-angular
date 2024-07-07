import { CommonOption } from "@shared/models/common-option.model";

export interface FilterOptions {
    title: string;
    key: string;
    initialValue: string;
    options: CommonOption[];
}