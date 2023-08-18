import { Request, Response } from 'express';
import Task from '../models/task.model';

export const createTask = async (req: Request, res: Response) => {
    try {
        const task = await Task.create(req.body);
        return res.status(201).json(task);
    } catch (error) {
        return res.status(500).send({
            message: 'Internal server error',
            error,
        });
    }
};

export const getTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).send({
                message: 'Task not found',
            });
        }

        return res.status(200).json(task);
    } catch (error) {
        return res.status(500).send({
            message: 'Internal server error',
            error,
        });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description, status, deadline, priority } = req.body;
        const task = await Task.findByIdAndUpdate(
            id,
            {
                name,
                description,
                status,
                deadline,
                priority,
            },
            { new: true }
        );
        if (!task) {
            return res.status(404).send({
                message: 'Task not found',
            });
        }
        return res.status(200).json(task);
    } catch (error) {
        return res.status(500).send({
            message: 'Internal server error',
        });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).send({
                message: 'Task not found',
            });
        }
        return res.status(200).json(task);
    } catch (error) {
        return res.status(500).send({
            message: 'Internal server error',
            error,
        });
    }
};
