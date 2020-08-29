"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class FileSystemImg {
    constructor() { }
    // Saves the image into the user's name directory
    saveImage(file, name) {
        return new Promise((resolve, reject) => {
            const pathDir = this.createDir(name); // Create directory
            const fileName = file.name; // File name
            file.mv(`${pathDir}/${fileName}`, (err) => {
                if (err) {
                    reject();
                }
                else {
                    resolve();
                }
            });
        });
    }
    // Creates directory with user name if !exists
    createDir(name) {
        const pathDir = path_1.default.resolve(__dirname, '../uploads', name);
        const exists = fs_1.default.existsSync(pathDir);
        if (!exists) {
            fs_1.default.mkdirSync(pathDir); // Creates dir if ! exists
        }
        return pathDir;
    }
    // Gets an img by URL and User.name (dirName)
    getImgUrl(img, dirName) {
        const pathImg = path_1.default.resolve(__dirname, '../uploads', dirName, img);
        return pathImg;
    }
}
exports.default = FileSystemImg;
