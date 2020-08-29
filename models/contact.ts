import { Schema, model, Document } from 'mongoose';

const contactSchema = new Schema({
    created: {
        type: Date
    },
    email: {
        type: String,
        required: [true, "El email es obligatorio"]
    },
    message: {
        type: String,
        required: [true, "El mensaje es obligatorio"]
    },

});

contactSchema.pre<ICo>('save', function (next) {
    this.created = new Date();
    next();
});


contactSchema.method('checkEmailMessage', function (email: string = '', message: string = ''): boolean {
    // Regular Expresion to validate mail contact (RFC 5322)
    let regex = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/, 'i');

    if (!regex.test(email)) return false;
    if (message.length > 280) return false;

    return true;
});

interface ICo extends Document {
    created: Date;
    email: string;
    message: string;
    checkEmailMessage(email: string, message: string): boolean;
}

export const Contact = model<ICo>('contact', contactSchema);