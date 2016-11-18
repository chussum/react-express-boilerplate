import express from 'express';
import ctrl from '../controllers/authenticate';

const router = express.Router();

// generate token
router.post('/', ctrl.login);

export default module.exports = router;
