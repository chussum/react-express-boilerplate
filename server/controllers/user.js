import jwt from 'jsonwebtoken';
import models from '../models';

const secretKey = global.secretKey;

export default module.exports = {
    findAll(req, res) {
        models.User.findAll().then(users => res.json(users));
    },
    get(req, res) {
        const id = parseInt(req.params.id, 10);
        if (!id) {  // NaN
            return res.status(400).json({
                success: false,
                message: 'Invalid id'
            });
        }

        models.User.findOne({
            where: {
                id: id
            }
        }).then(user => {
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'No user'
                });
            }
            res.json(user);
        });
    },
    create(req, res) {
        const username = req.body.username.trim() || false;
        const password = req.body.password || false;
        const name = req.body.name.trim() || false;
        if (!username || !password || !name) {
            return res.status(400).json({
                success: false,
                message: 'Invalid name'
            });
        }

        models.User.create({
            username: username,
            password: password,
            name: name
        })
        .then(user => {
            // generate token
            user.token = jwt.sign({
                id: user.id,
                username: user.username
            }, secretKey);

            // update token value
            models.User.update({
                token: user.token
            }, {
                where: {
                    id: user.id
                }
            })
            .then(res.status(201).json(user))
            .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
    },
    destroy(req, res) {
        const id = parseInt(req.params.id, 10);
        if (!id) {
            return res.status(400).json({success: false, message: 'Invalid id'});
        }
        models.User.destroy({
            where: {
                id: id
            }
        })
        .then(() => {
            res.status(204).send();
        });
    }
};
