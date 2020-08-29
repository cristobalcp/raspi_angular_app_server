import { Schema, model, Document } from 'mongoose';

const newSchema = new Schema({
    created: {
        type: Date
    },
    title: {
        type: String,
    },
    subtitle: {
        type: String,
    },
    author: {
        type: String,
    },
    img_new: {
        type: String,
    },
    img_author: {
        type: String,
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

newSchema.pre<INew>('save', function (next) {
    this.created = new Date();
    next();
});

interface INew extends Document {
    created: Date;
    title: string;
    subtitle: string;
    author: string;
    img_new: string;
    img_author: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    paragraph4: string;

}

export const New = model<INew>('new', newSchema);