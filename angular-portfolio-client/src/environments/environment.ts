import { Environment } from "@app/shared/models/environment.model";

export const environment: Environment = {
    production: false,
    apiUrl: 'http://localhost:3000/api/v1',
    isUseMock: false,
    defaultLanguage: 'vi',
    resourceHost: 'http://localhost:3000/'
};