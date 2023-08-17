import { Router } from 'express';
import { confirmAccount, login } from '../controllers/auth.controller';
const router = Router();

router.post('/login', login);
router.get('/confirm/:token', confirmAccount);

export default router;
