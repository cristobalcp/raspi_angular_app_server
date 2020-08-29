"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutMe = void 0;
const mongoose_1 = require("mongoose");
const aboutSchema = new mongoose_1.Schema({
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
exports.AboutMe = mongoose_1.model('aboutMe', aboutSchema);
