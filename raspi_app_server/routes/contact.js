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
const contact_1 = require("../models/contact");
const auth_1 = require("../middlewares/auth");
const contactRoutes = express_1.Router();
// Create Message 
contactRoutes.post('/', auth_1.tokenVerification, (req, res) => {
    const body = req.body;
    const contactDB = new contact_1.Contact();
    if (contactDB.checkEmailMessage(body.email, body.message)) {
        contact_1.Contact.create(body).then(contactDB => {
            return res.json({
                ok: true,
                contact: contactDB
            });
        }).catch(err => {
            res.json({
                ok: false,
                err
            });
        });
    }
    else {
        res.json({
            ok: false,
            message: 'Invalid format'
        });
    }
});
// Delete Message 
contactRoutes.delete('/:id', (req, res) => {
    const id = req.params.id;
    contact_1.Contact.findByIdAndRemove(id, (err, contactDel) => {
        if (err)
            throw err;
        res.json({
            ok: true,
            message: 'Mensaje eliminado',
            body: contactDel
        });
    });
});
// Get News
contactRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = yield contact_1.Contact.find()
        .sort({ _id: 1 })
        .limit(50)
        .exec();
    res.json({
        ok: true,
        messages
    });
}));
exports.default = contactRoutes;
