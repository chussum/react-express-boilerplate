import express from 'express';
import ctrl from '../controllers/authenticate';

const router = express.Router();

// generate token
router.get('/', ctrl.login);

export default module.exports = router;
