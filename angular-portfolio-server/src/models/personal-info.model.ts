import mongoose, { Schema, Document } from 'mongoose';
import { Language } from './common.model';

export interface LanguageInfo {
    name: string;
    aboutMyself: string;
    experience: number;
    projects: number;
    company: number;
    aboutMyJob: string;
    position: string;
}
export interface PersonalInformation extends Document {
    socialId: string[];
    contactId: string[];
    cvLink: string;
    avatar: string;
    languages: Language<LanguageInfo>[];
}

export interface PersonalInformationByLanguage {
    id: string;
    socialId: string[];
    contactId: string[];
    cvLink: string;
    avatar: string;
    name: string;
    aboutMyself: string;
    experience: number;
    projects: number;
    company: number;
    aboutMyJob: string;
    position: string;
}

const PersonalInformationModelSchema: Schema = new Schema({
    socialId: {type: Array<String>, required: true},
    contactId: {type: Array<String>, required: true},
    cvLink: {type: String, required: true},
    avatar: {type: String, required: true},
    languages: {
        type: Array<Language<LanguageInfo>>,
        required: true
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Define and export the MenuModel based on schema
const PersonalInformationModel = mongoose.model<PersonalInformation>('PersonalInformation', PersonalInformationModelSchema);

export default PersonalInformationModel;