import { Request, Response } from 'express';
import User from '../models/user.model';
import { MongooseError } from 'mongoose';
import { generateRandomId } from '../helpers';

export const getUsers = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const users = await User.find();

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error,
        });
    }
};

export const createUser = async (req: Request, res: Response) => {
    console.log(generateRandomId());
    try {
        const { name, email, password } = req.body;

        const newUser = new User({
            name,
            email,
            password,
            token: generateRandomId(),
        });

        await newUser.save();

        return res.status(201).json(newUser);
    } catch (error) {
        if (error instanceof MongooseError) {
            return res.status(400).json({
                message: error.message,
            });
        }

        return res.status(500).send(error);
    }
};
