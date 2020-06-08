import { Router } from 'express';
import { UserController } from '../controllers';
import auth from '../middlewares/auth';

const router = Router();
const { createUser, login, getUser } = UserController;

router.post('/signup', createUser);
router.post('/login', login);
router.get('/me', auth, getUser);

export default router;