import { Request, Response } from 'express';
import Project from '../models/project.model';
import Task from '../models/task.model';

export const getProjects = async (req: Request, res: Response) => {
    try {
        const { uid } = req;
        const projects = await Project.find({
            $or: [{ createdBy: uid }, { collaborators: uid }],
        });
        return res.status(200).json(projects);
    } catch (error) {
        return res.status(500).send({
            message: 'Internal server error',
            error,
        });
    }
};

export const createProject = async (req: Request, res: Response) => {
    try {
        const { uid } = req;
        const project = await Project.create({
            ...req.body,
            createdBy: uid,
        });
        return res.status(201).json(project);
    } catch (error) {
        return res.status(500).send({
            message: 'Internal server error',
            error,
        });
    }
};

export const getProject = async (req: Request, res: Response) => {
    try {
        const { uid } = req;
        const { id } = req.params;
        const project = await Project.findOne({
            _id: id,
            $or: [{ createdBy: uid }, { collaborators: uid }],
        });
        if (!project) {
            return res.status(404).send({
                message: 'Project not found',
            });
        }
        return res.status(200).json(project);
    } catch (error) {
        return res.status(500).send({
            message: 'Internal server error',
        });
    }
};

export const updateProject = async (req: Request, res: Response) => {
    try {
        const { uid } = req;
        const { id } = req.params;
        const { name, description, deadline, client, isCompleted } = req.body;

        const project = await Project.findOneAndUpdate(
            {
                _id: id,
                createdBy: uid,
            },
            { name, description, deadline, client, isCompleted },
            { new: true }
        );
        if (!project) {
            return res.status(404).send({
                message: 'Project not found',
            });
        }
        return res.status(200).json(project);
    } catch (error) {
        return res.status(500).send({
            message: 'Internal server error',
            error,
        });
    }
};

export const deleteProject = async (req: Request, res: Response) => {
    try {
        const { uid } = req;
        const { id } = req.params;

        const project = await Project.findOneAndDelete({
            _id: id,
            createdBy: uid,
        });
        if (!project) {
            return res.status(404).send({
                message: 'Project not found',
            });
        }
        return res.status(200).json(project);
    } catch (error) {
        return res.status(500).send({
            message: 'Internal server error',
            error,
        });
    }
};

export const addCollaborator = async (req: Request, res: Response) => {
    try {
        const { uid } = req;
        const { id } = req.params;
        const { collaboratorsId } = req.body;

        const project = await Project.findOne({
            _id: id,
            createdBy: uid,
        });
        if (!project) {
            return res.status(404).send({
                message: 'Project not found',
            });
        }

        const isAlreadyAdded = project.collaborators.some((collaborator) =>
            collaboratorsId.includes(collaborator.toString())
        );
        if (!isAlreadyAdded) {
            project.collaborators.push(...collaboratorsId);
            await project.save();
        }

        return res.status(200).json(project);
    } catch (error) {
        return res.status(500).send({
            message: 'Internal server error',
            error,
        });
    }
};

export const removeCollaborator = async (req: Request, res: Response) => {
    try {
        const { uid } = req;
        const { id, collaboratorId } = req.params;

        const project = await Project.findOne({
            _id: id,
            createdBy: uid,
        });
        if (!project) {
            return res.status(404).send({
                message: 'Project not found',
            });
        }
        project.collaborators = project.collaborators.filter(
            (collaborator) => collaborator.toString() !== collaboratorId
        );
        await project.save();
        return res.status(200).json(project);
    } catch (error) {
        return res.status(500).send({
            message: 'Internal server error',
            error,
        });
    }
};

export const getTasks = async (req: Request, res: Response) => {
    try {
        const { uid } = req;
        const { id } = req.params;

        const project = await Project.findOne({
            _id: id,
            $or: [{ createdBy: uid }, { collaborators: uid }],
        });
        if (!project) {
            return res.status(404).send({
                message: 'Project not found',
            });
        }

        const tasks = await Task.find({
            project: id,
        });

        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).send({
            message: 'Internal server error',
            error,
        });
    }
};
