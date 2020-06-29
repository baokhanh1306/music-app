import { Router } from 'express';
import { ArtistController } from '../controllers';

const router = Router();

router.get('/', ArtistController.getAllArtists);
router.get('/:id', ArtistController.getArtistById);
router.post('/', ArtistController.createArtist);


export default router;