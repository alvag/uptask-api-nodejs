import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../helpers/jwt.helper';

export const isAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.get('Authorization')?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                message: 'No tienes autorización.',
            });
        }

        const { uid } = verifyToken(token);

        req.uid = uid;

        next();
    } catch (error) {
        res.status(401).json({
            message: 'No tienes autorización.',
        });
    }
};
