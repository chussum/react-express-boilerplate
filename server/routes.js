import express from 'express';
import * as authenticate from './controllers/authenticate';

const router = express.Router();

// required token route
router.get('/test/token', authenticate.auth, (req, res) => {
    res.send({
        message: 'OK'
    });
});


export default router;
