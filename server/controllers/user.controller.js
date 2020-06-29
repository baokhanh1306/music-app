import { User } from '../models';
import catchAsync from '../middlewares/catchAsync';

const createUser = catchAsync(async (req, res, next) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'Sign up successfully' });
});

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;        
    const user = await User.findByCredentials(email, password);
    const token = await user.generateToken();
    res.json({ token: token});
});

const getUser = (req, res, next) => {
    res.json(user);
}

export default {createUser, getUser, login};