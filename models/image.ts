import { Schema, model, Document } from 'mongoose';

const imageSchema = new Schema({
    created: {
        type: Date
    },
    img: {
        type: String,
        required: [true, "Seleccione una imagen"]
    }
});

imageSchema.pre<IImg>('save', function (next) {
    this.created = new Date();
    next();
});

interface IImg extends Document {
    created: Date;
    img: string;
}

export const Image = model<IImg>('image', imageSchema);