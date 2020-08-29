import { Router, Response } from 'express';
import { Contact } from '../models/contact';
import { tokenVerification } from '../middlewares/auth';

const contactRoutes = Router();

// Create Message 
contactRoutes.post('/', tokenVerification, (req: any, res: Response) => {
    const body = req.body;
    const contactDB = new Contact();
    if(contactDB.checkEmailMessage(body.email, body.message)){
        Contact.create(body).then(contactDB => {
            return res.json({
                ok: true,
                contact: contactDB
            });
        }).catch(err => {
            res.json({
                ok: false,
                err
            });
        });
    }else{
        res.json({
            ok: false,
            message: 'Invalid format'
        });
    }
});

// Delete Message 
contactRoutes.delete('/:id', (req: any, res: Response) => {
    const id = req.params.id;

    Contact.findByIdAndRemove(id, (err, contactDel)=>{
        if(err) throw err;

        res.json({
            ok: true,
            message: 'Mensaje eliminado',
            body: contactDel
        });
    });
});

// Get News
contactRoutes.get('/', async (req: any, res: Response) => {

    const messages = await Contact.find()
        .sort({ _id: 1 })
        .limit(50)
        .exec();

    res.json({
        ok: true,
        messages
    });
});
export default contactRoutes;
