import { MongooseError, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'El nombre es obligatorio'],
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'La contraseña es obligatoria'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'El email es obligatorio'],
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

    user.password = bcrypt.hashSync(user.password!, 10);

    next();
});

const User = model('User', userSchema);

export default User;
