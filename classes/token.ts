import jwt, { JsonWebTokenError } from 'jsonwebtoken';
export default class Token {
    private static seed: string = 'seed,ownPrivacity-CristobalCPL';
    private static expiration: string = '1h'; // possible values: (1h == 1 hour || 1d = 1 day)

    constructor() { }

    static getToken(payload: any): string {
        return jwt.sign({
            user: payload
        }, this.seed, { expiresIn: this.expiration });
    }

    static checkToken(userToken :string){
        return new Promise((resolve, reject)=>{
            jwt.verify(userToken, this.seed, (err, decoded) =>{
                if(err) {
                    reject();
                }else{
                    resolve(decoded );
                }
            });
        });
    }
}