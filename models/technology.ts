import { Schema, model, Document } from 'mongoose';

const techSchema = new Schema({
    icon: {
        type: String,
        required: [true, "El icono es obligatorio"]

    },
    technology: {
        type: String,
        required: [true, "El email es obligatorio"]
    },
    experience: {
        type: String,
        required: [true, "La experiencia es obligatoria"]
    },

});

interface ITech extends Document {
    icon: string;
    technology: string;
    experience: string;
}

export const Technology = model<ITech>('technology', techSchema);