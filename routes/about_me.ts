import { Router, Response } from 'express';
import { tokenVerification } from '../middlewares/auth';
import { AboutMe } from '../models/about_me';

const aboutMeRoutes = Router();

// Create About Me 
aboutMeRoutes.post('/', tokenVerification, (req: any, res: Response) => {
    const body = req.body;
    body.title = 'Cristóbal Cenalmor Pérez-Lago';

    AboutMe.create(body).then(aboutMeDB => {
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
aboutMeRoutes.post('/update/:id', (req: any, res: Response) => {
    const id = req.params.id;
    const aboutMe = {
        paragraph1: req.body.paragraph1,
        paragraph2: req.body.paragraph2,
        paragraph3: req.body.paragraph3,
        paragraph4: req.body.paragraph4
    }
    AboutMe.findByIdAndUpdate(id, aboutMe, { new: true }, (err, aboutMeDB) => {
        if (err) throw err;
        if(!aboutMeDB) {
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
aboutMeRoutes.get('/', async (req: any, res: Response) => {
    const aboutMe = await AboutMe.find().sort({__id: -1}).exec();

    res.json({
        ok: true,
        aboutMe
    })
});
export default aboutMeRoutes;
