import express from 'express';
import user from './controllers/user';
import authenticate from './controllers/authenticate';

const router = express.Router();

// required token route
router.get('/profile', authenticate.auth, (req, res) => {
    res.send({
        message: 'OK'
    });
});

// user
router.get('/users', user.findAll);
router.get('/user/:id', user.get);
router.post('/user', user.create);
router.delete('/user/:id', user.destroy);

// login
router.post('/login', authenticate.login);
router.get('/logout', authenticate.logout);

export default router;
