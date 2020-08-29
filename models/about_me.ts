import { Schema, model, Document } from 'mongoose';

const aboutSchema = new Schema({
    title: {
        type: String
    },
    paragraph1: {
        type: String,
    },
    paragraph2: {
        type: String,
    },
    paragraph3: {
        type: String,
    },
    paragraph4: {
        type: String,
    }
});

interface IAme extends Document {
    title: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    paragraph4: string;
}

export const AboutMe = model<IAme>('aboutMe', aboutSchema);