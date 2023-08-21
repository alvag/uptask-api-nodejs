import { Request, Response } from 'express';
import User from '../models/user.model';
import { MongooseError } from 'mongoose';
import { generateRandomId, sendEmailAccountConfirmation } from '../helpers';
import { createToken } from '../helpers/jwt.helper';

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
    try {
        const { name, email, password } = req.body;

        const newUser = new User({
            name,
            email,
            password,
            token: generateRandomId(),
        });

        await newUser.save();

        sendEmailAccountConfirmation( email, newUser.token! );

        return res.status( 201 ).json( {
            message: 'Usuario creado correctamente',
        } );
    } catch (error) {
        if (error instanceof MongooseError) {
            return res.status(400).json({
                message: error.message,
            });
        }

        return res.status(500).send({
            message: 'Internal server error',
        });
    }
};

export const me = async (req: Request, res: Response) => {
    try {
        const { uid } = req;

        const user = await User.findById(uid);

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        return res.status( 200 ).json( {
            user,
            token: createToken( user._id ),
        } );
    } catch (error) {
        return res.status(500).send({
            message: 'Internal server error',
        });
    }
};


