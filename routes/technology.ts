import { Router, Response } from 'express';
import { tokenVerification } from '../middlewares/auth';
import { Technology } from '../models/technology';

const techRoutes = Router();

// Create Technology 
techRoutes.post('/', tokenVerification, (req: any, res: Response) => {
    const body = req.body;

    Technology.create(body).then(techDB => {
        res.json({
            ok: true,
            technology: techDB
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});

// Update Technology
techRoutes.post('/update/:id', (req: any, res: Response) => {
    const id = req.params.id;
    const tech = {
        icon: req.body.icon,
        technology: req.body.technology,
        experience: req.body.experience
    }

    Technology.findByIdAndUpdate(id, tech, { new: true }, (err, techDB) => {
        if (err) throw err;
        if (!techDB) {
            res.json({
                ok: false,
                message: 'Invalid data'
            });
        }
        res.json({
            ok: true,
            body: techDB
        });
    });
});

// Get Technology
techRoutes.get('/', async (req: any, res: Response) => {
    const tech = await Technology.find().exec();

    res.json({
        ok: true,
        tech
    })
});
export default techRoutes;
