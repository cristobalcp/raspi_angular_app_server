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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const file_system_new_1 = __importDefault(require("../classes/file_system_new"));
const new_1 = require("../models/new");
const newRoutes = express_1.Router();
const fileSystem = new file_system_new_1.default();
// Create New 
newRoutes.post('/:imgNew/:imgAuthor', auth_1.tokenVerification, (req, res) => {
    const body = req.body;
    const img_author = req.params.imgAuthor;
    const img_new = req.params.imgNew;
    body.img_author = img_author;
    body.img_new = img_new;
    new_1.New.create(body).then(newDB => {
        res.json({
            ok: true,
            new: newDB
        });
        fileSystem.saveImageAuthor(img_author); // Saves img_author
        fileSystem.saveImageNew(img_new); // Saves img_new
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
// Get News
newRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let page = Number(req.query.page) || 1;
    let skip = page - 1;
    skip = skip * 8;
    const news = yield new_1.New.find()
        .sort({ _id: 1 })
        .skip(skip)
        .limit(8)
        .exec();
    res.json({
        ok: true,
        page,
        news
    });
}));
// Uploads Img_author
newRoutes.post('/upload_author', auth_1.tokenVerification, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const img_author = req.files.img_author;
    yield fileSystem.saveImageAuthor(img_author);
    res.json({
        ok: true,
        img_author: img_author.name
    });
}));
// Uploads Img_new
newRoutes.post('/upload_new', auth_1.tokenVerification, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const img_new = req.files.img_new;
    yield fileSystem.saveImageNew(img_new);
    res.json({
        ok: true,
        img_new: img_new.name
    });
}));
// Show IMG new by URL
newRoutes.get('/img_new/:img', (req, res) => {
    const img = req.params.img;
    const pathImgNew = fileSystem.getImgNewUrl(img);
    res.sendFile(pathImgNew);
});
// Show IMG author by URL
newRoutes.get('/img_author/:img', (req, res) => {
    const img = req.params.img;
    const pathImgAuthor = fileSystem.getImgAuthorUrl(img);
    res.sendFile(pathImgAuthor);
});
exports.default = newRoutes;
