import { Router } from 'express';
import { isAuth } from '../middlewares/auth.middleware';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import projectsRoutes from './projects.routes';
import tasksRoutes from './tasks.routes';

const router = Router();

router.get('/', (_, res) => {
    res.send('Hello world');
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/projects', [isAuth], projectsRoutes);
router.use('/tasks', [isAuth], tasksRoutes);

export default router;
