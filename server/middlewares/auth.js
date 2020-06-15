import jwt from 'jsonwebtoken';
import { User } from '../models';
import { ErrorHandler } from './error';

export default async (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        throw new ErrorHandler(401, 'Not authorized to access');
    }
    const data = jwt.verify(token, process.env.JWT_KEY);
    try {
        const user = await User.findOne({ _id: data._id, 'tokens': token});
        if (!user) {
            throw new ErrorHandler(401, 'Not authorized to access');
        }
        req.user = user;
        req.token = token;
        next();
    } catch(error) {
       next(error);
    }
};