import { Router, Response } from 'express';
import { tokenVerification } from '../middlewares/auth';
import FileSystemNew from '../classes/file_system_new';
import { New } from '../models/new';

const newRoutes = Router();
const fileSystem = new FileSystemNew();

// Create New 
newRoutes.post('/:imgNew/:imgAuthor', tokenVerification, (req: any, res: Response) => {
    const body = req.body;
    const img_author = req.params.imgAuthor;
    const img_new = req.params.imgNew;

    body.img_author = img_author;
    body.img_new = img_new;

    New.create(body).then(newDB => {

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
newRoutes.get('/', async (req: any, res: Response) => {
    let page = Number(req.query.page) || 1;
    let skip = page - 1;
    skip = skip * 8;

    const news = await New.find()
        .sort({ _id: 1 })
        .skip(skip)
        .limit(8)
        .exec();

    res.json({
        ok: true,
        page,
        news
    });
});

// Uploads Img_author
newRoutes.post('/upload_author', tokenVerification, async (req: any, res: Response) => {
    const img_author = req.files.img_author;
    await fileSystem.saveImageAuthor(img_author);

    res.json({
        ok: true,
        img_author: img_author.name
    });
});

// Uploads Img_new
newRoutes.post('/upload_new', tokenVerification, async (req: any, res: Response) => {
    const img_new = req.files.img_new;
    await fileSystem.saveImageNew(img_new);

    res.json({
        ok: true,
        img_new: img_new.name
    });
});

// Show IMG new by URL
newRoutes.get('/img_new/:img', (req: any, res: Response) => {
    const img = req.params.img;
    const pathImgNew = fileSystem.getImgNewUrl(img);
    res.sendFile(pathImgNew);
});

// Show IMG author by URL
newRoutes.get('/img_author/:img', (req: any, res: Response) => {
    const img = req.params.img;
    const pathImgAuthor = fileSystem.getImgAuthorUrl(img);
    res.sendFile(pathImgAuthor);
});

export default newRoutes;
