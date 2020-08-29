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
const about_me_1 = require("../models/about_me");
const aboutMeRoutes = express_1.Router();
// Create About Me 
aboutMeRoutes.post('/', auth_1.tokenVerification, (req, res) => {
    const body = req.body;
    body.title = 'Cristóbal Cenalmor Pérez-Lago';
    about_me_1.AboutMe.create(body).then(aboutMeDB => {
        res.json({
            ok: true,
            aboutMe: aboutMeDB
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
// Update About Me 
aboutMeRoutes.post('/update/:id', (req, res) => {
    const id = req.params.id;
    const aboutMe = {
        paragraph1: req.body.paragraph1,
        paragraph2: req.body.paragraph2,
        paragraph3: req.body.paragraph3,
        paragraph4: req.body.paragraph4
    };
    about_me_1.AboutMe.findByIdAndUpdate(id, aboutMe, { new: true }, (err, aboutMeDB) => {
        if (err)
            throw err;
        if (!aboutMeDB) {
            res.json({
                ok: false,
                message: 'Invalid data'
            });
        }
        res.json({
            ok: true,
            body: aboutMeDB
        });
    });
});
// Get About Me 
aboutMeRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const aboutMe = yield about_me_1.AboutMe.find().sort({ __id: -1 }).exec();
    res.json({
        ok: true,
        aboutMe
    });
}));
exports.default = aboutMeRoutes;
