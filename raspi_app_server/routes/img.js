"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const image_1 = require("../models/image");
const auth_1 = require("../middlewares/auth");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const file_system_img_1 = __importDefault(require("../classes/file_system_img"));
const imageRoutes = express_1.Router();
const fileSystem = new file_system_img_1.default();
// Create Image 
imageRoutes.post('/', auth_1.tokenVerification, (req, res) => {
    const body = req.body;
    const file = req.files.img;
    body.img = file.name;
    console.log(file);
    image_1.Image.create(body).then(imageDB => {
        res.json({
            ok: true,
            imageDB
        });
        fileSystem.saveImage(file, req.user.name); // Saves img
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
// Delete Image 
imageRoutes.delete('/:id/:name', auth_1.tokenVerification, (req, res) => {
    const id = req.params.id;
    const name = req.params.name;
    const dirName = req.user.name;
    image_1.Image.findByIdAndRemove(id, (err, imageDel) => {
        if (err)
            throw err;
        res.json({
            ok: true,
            message: 'Imagen eliminada',
            body: imageDel
        });
        fs_1.default.unlinkSync(path_1.default.resolve(__dirname, '../uploads', dirName, name));
    });
});
// Show IMG by URL
imageRoutes.get('/:name/:img', (req, res) => {
    const img = req.params.img;
    const dirName = req.params.name;
    const pathImg = fileSystem.getImgUrl(img, dirName);
    res.sendFile(pathImg);
});
// Update IMG
imageRoutes.post('/update', auth_1.tokenVerification, (req, res) => {
    const file = req.files.img;
    fileSystem.saveImage(file, req.user.name);
    res.json({
        ok: true,
        message: 'Imagen actualizada'
    });
});
exports.default = imageRoutes;
