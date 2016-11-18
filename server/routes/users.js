import express from 'express';
import ctrl from '../controllers/user';

const router = express.Router();

router.get('/', ctrl.findAll);
router.get('/:id', ctrl.get);
router.post('/', ctrl.create);
router.delete('/:id', ctrl.destroy);

export default router;
