export interface MultipleLanguage<T> {
    languageCode: string;
    name?: string;
    isDefault: boolean;
    icon?: string;
    data: T;
}