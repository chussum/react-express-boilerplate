import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const auth = (req, res, next) => {
    let secretKey = process.env.SECRET_KEY;
    let token = req.headers['x-access-token'] || req.body.token;
    if (token){
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(403).send({
                    success : false,
                    message : 'Invalid token'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success : false,
            message : 'No token'
        });
    }
};