import { CommonOption } from "@shared/models/common-option.model";

export interface SearchFormConfig {
    name: string;
    isRequired?: boolean;
    initialValue: string | string[] | boolean;
    key: string;
    type: 'TEXT' | 'CHECKBOX' | 'DROPDOWN' | 'RADIO';
    options?: CommonOption[];
    span?: number;
    placeholder?: string;
}