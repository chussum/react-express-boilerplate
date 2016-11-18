import models from '../models/user';

export default {
    findAll(req, res) {
        models.User.findAll().then(users => res.json(users));
    },
    get(req, res) {
        const id = parseInt(req.params.id, 10);
        if (!id) {  // NaN
            return res.status(400).json({error: 'Invalid id'});
        }
        models.User.findOne({
            where: {
                id: id
            }
        }).then(user => {
            if (!user) {
                return res.status(404).json({error: 'No user'});
            }
            res.json(user);
        });
    },
    create(req, res) {
        const name = req.body.name.trim() || false;
        if (!name) {
            return res.status(400).json({error: 'Invalid name'});
        }
        models.User.create({name: name}).then(user => res.status(201).json(user));
    },
    destroy(req, res) {
        const id = parseInt(req.params.id, 10);
        if (!id) {
            return res.status(400).json({error: 'Invalid id'});
        }
        models.User.destroy({
            where: {
                id: id
            }
        }).then((result) => {
            res.status(204).send();
        });
    }
}