import { Router } from 'express';
import { createUser, getUsers, me } from '../controllers/user.controller';
import { isAuth } from '../middlewares/auth.middleware';
const router = Router();

router.get('/', getUsers);
router.post('/', createUser);
router.get('/me', [isAuth], me);

export default router;
