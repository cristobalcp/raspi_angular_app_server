"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class FileSystemNew {
    constructor() { }
    // Gets an img by URL into img_new directory
    getImgNewUrl(img) {
        const pathImgNew = path_1.default.resolve(__dirname, '../uploads', 'img_new', img);
        return pathImgNew;
    }
    // Saves an image of the new
    saveImageNew(file) {
        return new Promise((resolve, reject) => {
            const pathDirNew = this.createDirImgNew(); // Create directory
            const fileName = file.name; // File name
            file.mv(`${pathDirNew}/${fileName}`, (err) => {
                if (err) {
                    reject();
                }
                else {
                    resolve();
                }
            });
        });
    }
    // Creates directory img_new if !exists
    createDirImgNew() {
        const pathDirNew = path_1.default.resolve(__dirname, '../uploads/img_new');
        const exists = fs_1.default.existsSync(pathDirNew);
        if (!exists) {
            fs_1.default.mkdirSync(pathDirNew); // Creates dir if ! exists
        }
        return pathDirNew;
    }
    // Gets an img by URL into img_new directory
    getImgAuthorUrl(img) {
        const pathImgAuthor = path_1.default.resolve(__dirname, '../uploads', 'img_author', img);
        return pathImgAuthor;
    }
    // Saves an image into img_author directory
    saveImageAuthor(file) {
        return new Promise((resolve, reject) => {
            const pathDirAuthor = this.createDirImgAuthor(); // Create directory
            const fileName = file.name; // File name
            file.mv(`${pathDirAuthor}/${fileName}`, (err) => {
                if (err) {
                    reject();
                }
                else {
                    resolve();
                }
            });
        });
    }
    // Creates directory img_author if !exists
    createDirImgAuthor() {
        const pathDirAuthor = path_1.default.resolve(__dirname, '../uploads/img_author');
        const exists = fs_1.default.existsSync(pathDirAuthor);
        if (!exists) {
            fs_1.default.mkdirSync(pathDirAuthor); // Creates dir if ! exists
        }
        return pathDirAuthor;
    }
}
exports.default = FileSystemNew;
