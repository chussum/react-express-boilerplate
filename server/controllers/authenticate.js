import jwt from 'jsonwebtoken';
import models from '../models/user';

const secretKey = 'iluvhyungdewdewdewkwon';

export default module.exports = {
    // generate token
    login(req, res) {
        models.User.findOne({
            where: {
                username: req.body.username
            }
        }).then(user => {
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'No user'
                });
            }

            if (user.password !== req.body.password) {
                return res.json({
                    success: false,
                    meesage: 'Invalid password'
                });
            }

            // generate token
            var token = jwt.sign({
                name : user.name,
                username : user.username
            }, secretKey, {
                // 24 hours
                expiresInMinutes : 1440
            });

            // return token
            res.json({
                success : true,
                message : 'this is your token',
                token : token
            });
        });
    },
    authenticate(req, res, next) {
        var token = req.body.token || req.param('token') || req.headers['x-access-token'];
        if (token){
            jwt.verify(token, secretKey, function(err, decoded) {
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
    }
};
