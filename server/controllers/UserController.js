import { User } from '../models';

const createUser = async (req, res, next) => {
    try{
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: 'Sign up successfully' });
    } catch(error) {
        res.status(400).json(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;        
        const user = await User.findByCredentials(email, password);
        if (!user) {
            return res.status(401).json({ error: 'Login failed! Check credentials'});
        } 
        const token = await user.generateToken();
        res.json({ token: token});
    } catch(error) {
        res.status(400).json(error);
    }
};

const getUser = (req, res, next) => {
    res.json(req.user);
}

export default {createUser, getUser, login};