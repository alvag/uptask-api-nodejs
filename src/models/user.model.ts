import { MongooseError, Schema, Types, model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserModel {
    uid?: Types.ObjectId;
    name: string;
    password: string;
    email: string;
    token?: string;
    isConfirmed?: boolean;
}

const userSchema = new Schema<UserModel>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        token: {
            type: String,
        },
        isConfirmed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.methods.toJSON = function () {
    const user = this.toObject();
    user.uid = user._id;
    delete user._id;
    delete user.password;
    delete user.__v;
    return user;
};

userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;

    const exists = await User.exists({ email: user.email });

    if (exists) {
        throw new MongooseError('Ya existe un usuario con ese email');
    }

    if (!user.isModified('password')) return next();

    user.password = bcrypt.hashSync(user.password, 10);

    next();
});

const User = model('User', userSchema);

export default User;
