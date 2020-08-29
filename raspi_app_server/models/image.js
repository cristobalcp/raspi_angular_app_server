"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const mongoose_1 = require("mongoose");
const imageSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    img: {
        type: String,
        required: [true, "Seleccione una imagen"]
    }
});
imageSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Image = mongoose_1.model('image', imageSchema);
