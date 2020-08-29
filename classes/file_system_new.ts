import path from 'path';
import fs from 'fs';

export default class FileSystemNew {
    constructor() { }

    // Gets an img by URL into img_new directory
    getImgNewUrl(img: string) {
        const pathImgNew = path.resolve(__dirname, '../uploads', 'img_new', img);
        return pathImgNew;
    }

    // Saves an image of the new
    saveImageNew(file: any) {
        return new Promise((resolve, reject) => {

            const pathDirNew = this.createDirImgNew();         // Create directory
            const fileName = file.name;                         // File name

            file.mv(`${pathDirNew}/${fileName}`, (err: any) => {   // Move file
                if (err) {
                    reject();
                } else {
                    resolve();
                }
            });
        });
    }

    // Creates directory img_new if !exists
    private createDirImgNew(): string {
        const pathDirNew = path.resolve(__dirname, '../uploads/img_new');
        const exists = fs.existsSync(pathDirNew);

        if (!exists) {
            fs.mkdirSync(pathDirNew); // Creates dir if ! exists
        }

        return pathDirNew;
    }

    // Gets an img by URL into img_new directory
    getImgAuthorUrl(img: string) {
        const pathImgAuthor = path.resolve(__dirname, '../uploads', 'img_author', img);
        return pathImgAuthor;
    }
    // Saves an image into img_author directory
    saveImageAuthor(file: any) {
        return new Promise((resolve, reject) => {

            const pathDirAuthor = this.createDirImgAuthor();            // Create directory
            const fileName = file.name;                                 // File name

            file.mv(`${pathDirAuthor}/${fileName}`, (err: any) => {     // Move file
                if (err) {
                    reject();
                } else {
                    resolve();
                }
            });
        });
    }

    // Creates directory img_author if !exists
    private createDirImgAuthor(): string {
        const pathDirAuthor = path.resolve(__dirname, '../uploads/img_author');
        const exists = fs.existsSync(pathDirAuthor);

        if (!exists) {
            fs.mkdirSync(pathDirAuthor); // Creates dir if ! exists
        }

        return pathDirAuthor;
    }
}