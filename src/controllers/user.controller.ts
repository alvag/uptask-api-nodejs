import { Request, Response } from 'express';

export const getUsers = async (
    req: Request,
    res: Response
): Promise<Response> => {
    return res.json({
        message: 'Hello world from controller',
    });
};

export const createUser = (req: Request, res: Response) => {
    return res.json({
        message: 'User created',
    });
};
