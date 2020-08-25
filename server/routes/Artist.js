import { Router } from 'express';
import { ArtistController } from '../controllers';

const router = Router();

router.get('/', ArtistController.getAllArtists);
router.get('/:id', ArtistController.getArtistById);
router.post('/', ArtistController.createArtist);
router.get('/:id/albums', ArtistController.getAlbumsByArtist);
router.get('/:id/tracks', ArtistController.getTracksByArtist);

export default router;