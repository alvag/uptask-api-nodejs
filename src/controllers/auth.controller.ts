import { Request, Response } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import { createToken } from '../helpers/jwt.helper';
import { generateRandomId } from '../helpers';

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({
                message: 'El email y la contraseña son requeridos',
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({
                message: 'Email o contraseña incorrectos',
            });
        }

        if (!user.isConfirmed) {
            return res.status(400).send({
                message: 'Debes confirmar tu cuenta para iniciar sesión',
            });
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).send({
                message: 'Email o contraseña incorrectos',
            });
        }

        return res.status(200).send({
            user,
            token: createToken(user._id),
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Internal server error',
        });
    }
};

export const confirmAccount = async (req: Request, res: Response) => {
    try {
        const { token } = req.params;

        const user = await User.findOneAndUpdate(
            {
                token,
            },
            { isConfirmed: true, token: null },
            { new: true }
        );

        if (!user) {
            return res.status(404).send({
                message: 'Token inválido',
            });
        }

        return res.json({
            user,
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Internal server error',
        });
    }
};

export const recoveryPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        const token = generateRandomId();

        const user = await User.findOneAndUpdate({ email }, { token });

        if (!user) {
            return res.status(404).send({
                message: 'Email no encontrado',
            });
        }

        return res.json({
            message: 'Se ha enviado un correo para recuperar tu contraseña',
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Internal server error',
        });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!password) {
            return res.status(400).send({
                message: 'La contraseña es requerida',
            });
        }

        const user = await User.findOneAndUpdate(
            { token },
            { password, token: null }
        );

        if (!user) {
            return res.status(404).send({
                message: 'Token inválido',
            });
        }

        return res.json({
            message: 'Contraseña actualizada',
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Internal server error',
        });
    }
};
