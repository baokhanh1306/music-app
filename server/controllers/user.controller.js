import { User } from '../models';
import catchAsync from '../middlewares/catchAsync';
import { ErrorHandler } from '../middlewares/error';

const createUser = catchAsync(async (req, res, next) => {
    const foundUser = await User.findOne({ email: req.body.email });
    if (foundUser) {
        throw new ErrorHandler(400, 'Email has been registered');
    }
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'Sign up successfully' });
});

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;        
    const user = await User.findByCredentials(email, password);
    const token = await user.generateToken();
    res.json({ token, email: user.email });
});

const getUser = (req, res, next) => {
    res.json(user);
};

export default {createUser, getUser, login};