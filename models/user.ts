import {  Schema, model, Document }  from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({

    name: {
        type: String,
        unique: true,
        required: [true, "El nombre es obligatorio"]
    },
    password: {
        type: String,
        unique: true,
        required: [true, "El password es obligatorio"]
    },

});

userSchema.method('checkPassword', function(password : string = ''): boolean  {
    // Encrypted password comparission
    if(bcrypt.compareSync(password, this.password)){
        return true;
    }else{
        return false;  
    }
});

interface IYo extends Document{
    name: string,
    password: string,
    checkPassword(password: string):boolean
}

export const User = model<IYo>('user', userSchema);