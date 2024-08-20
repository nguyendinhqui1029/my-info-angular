import mongoose, { Schema, Document } from 'mongoose';
import { Language } from './common.model';

export interface PostTypeDetailWithLanguage {
  id: string;
  name: string;
  description: string;
}
export interface LanguageInfo {
    name: string;
    description: string;
}
// Define interface for TypeScript type-checking
export interface PostType extends Document {
  id: string,
  languages: Language<LanguageInfo>[];
}

// Define Mongoose schema for PostType model
const PostTypeSchema: Schema = new Schema({
    languages: {
        type: Array<Language<LanguageInfo>>,
        required: true
    }, 
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Define and export the PostTypeModel based on schema
const PostTypeModel = mongoose.model<PostType>('post-type', PostTypeSchema);

export default PostTypeModel;