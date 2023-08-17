import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

export const createToken = (uid: Types.ObjectId) => {
    return jwt.sign(
        {
            uid,
        },
        process.env.TOKEN_SECRET_KEY!,
        { expiresIn: process.env.TOKEN_EXPIRES }
    );
};
