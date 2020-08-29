import { Router, Request, Response } from 'express';
import { User } from '../models/user';
import bcrypt from 'bcryptjs';
import Token from '../classes/token';
import { tokenVerification } from '../middlewares/auth';

const userRoutes = Router();
// Login 
userRoutes.post('/login', (req: Request, res: Response) => {
    const body = req.body;

    User.findOne({ name: body.name }, (err, userDB) => {
        if (err) throw err;
        if (!userDB)
            return res.json({
                ok: false,
                message: 'Invalid username'
            }); 
        if(userDB.checkPassword(body.password)){

            const myToken = Token.getToken({
                _id: userDB._id,
                name: userDB.name,
                password: userDB.password 
            });
            return res.json({
                ok: true,
                token: myToken
            });
        }else{
            return res.json({
                ok: false,
                message: 'Wrong password'
            });
        }
    });
});
// Create user 
userRoutes.post('/create', (req: Request, res: Response) => {
    const user = {
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 10)
    };

    // Insert into BD
    User.create(user).then(userDB => {
        res.json({
            ok: true,
            user: userDB
        });
    })
        .catch(err => {
            res.json({
                ok: false,
                err
            });
        });
});
// Update user
userRoutes.post('/update', tokenVerification, (req: any, res: Response) => {

    const user = {
        name: req.body.name || req.user.name,
        password: bcrypt.hashSync(req.body.password, 10) ||  bcrypt.hashSync(req.user.password, 10)
    }

    User.findByIdAndUpdate(req.user._id, user, { new: true }, (err, userDB) => {
        if (err) throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Invalid data'
            });
        }
        const myToken = Token.getToken({
            _id: userDB._id,
            name: userDB.name,
            password: userDB.password

        });
        res.json({
            ok: true,
            token: myToken
        });
    });
});
// Get user
userRoutes.get('/', async (req: any, res: Response) => {
    const user = await User.find()
        .limit(1) // Limit the number of Users getting
        .exec();

    res.json({
        ok: true,
        user
    });
});
export default userRoutes;
