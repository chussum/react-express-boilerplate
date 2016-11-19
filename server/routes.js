import express from 'express';
import user from './controllers/user';
import authenticate from './controllers/authenticate';

const router = express.Router();

// user
router.get('/users', user.findAll);
router.get('/user/:id', user.get);
router.post('/user', user.create);
router.delete('/user/:id', user.destroy);

// login
router.post('/login', authenticate.login);

// required token route
router.get('/profile', authenticate.auth, (req, res) => {
    res.json({
        message: 'TEST OK'
    });
});

export default module.exports = router;
