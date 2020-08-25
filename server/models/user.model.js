import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ErrorHandler } from '../middlewares/error';

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new ErrorHandler(404, 'Email is not valid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 3
    },
    tokens: [{
            type: String,
            required: true
    }]
});

userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.methods.generateToken = async function() {
    const user = this;
    const token = jwt.sign({email: user.email}, process.env.JWT_KEY);
    user.tokens = user.tokens.concat(token);
    await user.save();
    return token;
};

userSchema.statics.findByCredentials = async function(email, password){
    const user = await this.findOne({ email });
    if (!user) {
        throw new ErrorHandler(400, 'Invalid login credentials');
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new ErrorHandler(400, 'Invalid login credentials');
    }
    return user;
}

export default mongoose.model('User', userSchema);