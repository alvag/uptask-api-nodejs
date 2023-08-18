import { Router } from 'express';
import {
    confirmAccount,
    login,
    recoveryPassword,
    resetPassword,
} from '../controllers/auth.controller';
const router = Router();

router.post('/login', login);
router.get('/confirm/:token', confirmAccount);
router.post('/recovery-password', recoveryPassword);
router.post('/reset-password/:token', resetPassword);

export default router;