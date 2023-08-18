import { Router } from 'express';
import {
    addCollaborator,
    createProject,
    deleteProject,
    getProject,
    getProjects,
    getTasks,
    removeCollaborator,
    updateProject,
} from '../controllers/projects.controller';
const router = Router();

router.get('/', getProjects);
router.post('/', createProject);
router.get('/:id', getProject);
router.patch('/:id', updateProject);
router.delete('/:id', deleteProject);
router.put('/:id/collaborators', addCollaborator);
router.delete('/:id/collaborators/:collaboratorId', removeCollaborator);
router.get('/:id/tasks', getTasks);

export default router;
