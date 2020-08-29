"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenVerification = void 0;
const token_1 = __importDefault(require("../classes/token"));
exports.tokenVerification = (req, res, next) => {
    const userToken = req.get('myToken') || '';
    token_1.default.checkToken(userToken).then((decoded) => {
        req.user = decoded.user;
        next();
    })
        .catch((err) => {
        res.json({
            ok: false,
            message: 'Invalid token',
            err
        });
    });
};
