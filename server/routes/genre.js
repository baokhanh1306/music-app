import { Router } from 'express';
import { GenreController } from '../controllers';

const router = Router();

router.get('/', GenreController.getAllGenres);
router.get('/:id', GenreController.getGenreById);
router.post('/', GenreController.createGenre);

export default router;

