"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Technology = void 0;
const mongoose_1 = require("mongoose");
const techSchema = new mongoose_1.Schema({
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
exports.Technology = mongoose_1.model('technology', techSchema);
