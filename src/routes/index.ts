import { Router } from 'express';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';

const router = Router();

router.get('/', (_, res) => {
    res.send('Hello world');
});

router.use('/users', userRoutes);
router.use('/auth', authRoutes);

export default router;
