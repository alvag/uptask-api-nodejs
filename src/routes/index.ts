import { Router } from 'express';
import userRoutes from './user.routes';

const router = Router();

router.get('/', (_, res) => {
    res.send('Hello world');
});

router.use('/users', userRoutes);

export default router;
