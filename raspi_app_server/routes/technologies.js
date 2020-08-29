"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const technologies_1 = require("../models/technologies");
const techRoutes = express_1.Router();
// Create Technology 
techRoutes.post('/', auth_1.tokenVerification, (req, res) => {
    const body = req.body;
    technologies_1.Technology.create(body).then(techDB => {
        res.json({
            ok: true,
            technology: techDB
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
// Update Technology
techRoutes.post('/update/:id', (req, res) => {
    const id = req.params.id;
    const tech = {
        icon: req.body.icon,
        technology: req.body.technology,
        experience: req.body.experience
    };
    technologies_1.Technology.findByIdAndUpdate(id, tech, { new: true }, (err, techDB) => {
        if (err)
            throw err;
        if (!techDB) {
            res.json({
                ok: false,
                message: 'Invalid data'
            });
        }
        res.json({
            ok: true,
            body: techDB
        });
    });
});
// Get Technology
techRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tech = yield technologies_1.Technology.find().exec();
    res.json({
        ok: true,
        tech
    });
}));
exports.default = techRoutes;
