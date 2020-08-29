"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../models/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const token_1 = __importDefault(require("../classes/token"));
const auth_1 = require("../middlewares/auth");
const userRoutes = express_1.Router();
// Login 
userRoutes.post('/login', (req, res) => {
    const body = req.body;
    user_1.User.findOne({ name: body.name }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB)
            return res.json({
                ok: false,
                message: 'Invalid username'
            });
        if (userDB.checkPassword(body.password)) {
            const myToken = token_1.default.getToken({
                _id: userDB._id,
                name: userDB.name,
                password: userDB.password
            });
            return res.json({
                ok: true,
                token: myToken
            });
        }
        else {
            return res.json({
                ok: false,
                message: 'Wrong password'
            });
        }
    });
});
// Create user 
userRoutes.post('/create', (req, res) => {
    const user = {
        name: req.body.name,
        password: bcryptjs_1.default.hashSync(req.body.password, 10)
    };
    // Insert into BD
    user_1.User.create(user).then(userDB => {
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
userRoutes.post('/update', auth_1.tokenVerification, (req, res) => {
    const user = {
        name: req.body.name || req.user.name,
        password: bcryptjs_1.default.hashSync(req.body.password, 10) || bcryptjs_1.default.hashSync(req.user.password, 10)
    };
    user_1.User.findByIdAndUpdate(req.user._id, user, { new: true }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Invalid data'
            });
        }
        const myToken = token_1.default.getToken({
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
userRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.User.find()
        .limit(1) // Limit the number of Users getting
        .exec();
    res.json({
        ok: true,
        user
    });
}));
exports.default = userRoutes;
