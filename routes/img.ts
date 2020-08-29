import { Router, Response } from 'express';
import { Image } from '../models/image';
import { tokenVerification } from '../middlewares/auth';
import fs from 'fs';
import path from 'path';
import FileSystemImg from '../classes/file_system_img';

const imageRoutes = Router();
const fileSystem = new FileSystemImg();

// Create Image 
imageRoutes.post('/', tokenVerification, (req: any, res: Response) => {
    const body = req.body;
    const file = req.files.img;
    body.img = file.name;

    console.log(file);

    Image.create(body).then(imageDB => {

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
imageRoutes.delete('/:id/:name', tokenVerification, (req: any, res: Response) => {
    const id = req.params.id;
    const name = req.params.name;
    const dirName = req.user.name;

    Image.findByIdAndRemove(id, (err, imageDel) => {
        if (err) throw err;

        res.json({
            ok: true,
            message: 'Imagen eliminada',
            body: imageDel
        });
        fs.unlinkSync(path.resolve(__dirname, '../uploads', dirName, name));
    });
});

// Show IMG by URL
imageRoutes.get('/:name/:img', (req: any, res: Response) => {
    const img = req.params.img;
    const dirName = req.params.name;
    
    const pathImg = fileSystem.getImgUrl(img, dirName);

    res.sendFile(pathImg);
});

// Update IMG
imageRoutes.post('/update', tokenVerification, (req: any, res: Response) => {
    const file = req.files.img;
    fileSystem.saveImage(file, req.user.name);
    res.json({
        ok: true,
        message: 'Imagen actualizada'
    });

});
export default imageRoutes;
