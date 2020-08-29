import path from 'path';
import fs from 'fs';
export default class FileSystemImg {
    constructor() { }

    // Saves the image into the user's name directory
    saveImage(file: any, name: string) {
        return new Promise((resolve, reject) => {

            const pathDir = this.createDir(name); // Create directory
            const fileName = file.name; // File name

            file.mv(`${pathDir}/${fileName}`, (err: any) => {  // Move file
                if (err) {
                    reject();
                } else {
                    resolve();
                }
            });
        });
    }

    // Creates directory with user name if !exists
    private createDir(name: string): string {
        const pathDir = path.resolve(__dirname, '../uploads', name);
        const exists = fs.existsSync(pathDir);

        if (!exists) {
            fs.mkdirSync(pathDir); // Creates dir if ! exists
        }

        return pathDir;
    }

    // Gets an img by URL and User.name (dirName)
    getImgUrl(img: string, dirName: string){
        const pathImg = path.resolve(__dirname, '../uploads', dirName, img);
        return pathImg;
    }

}