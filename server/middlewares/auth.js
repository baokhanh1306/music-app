import jwt from 'jsonwebtoken';
import { User } from '../models';

export default async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    const data = jwt.verify(token, process.env.JWT_KEY);
    try {
        const user = await User.findOne({ _id: data._id, 'tokens': token});
        if (!user) {
            throw new Error();
        }
        req.user = user;
        req.token = token;
        next();
    } catch(error) {
        res.status(401).json({ error: 'Not authorized to access'});
    }
};