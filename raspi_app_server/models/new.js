"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.New = void 0;
const mongoose_1 = require("mongoose");
const newSchema = new mongoose_1.Schema({
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
newSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.New = mongoose_1.model('new', newSchema);
