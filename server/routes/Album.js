import { Router } from 'express';
import { AlbumController } from '../controllers';

const router = Router();

router.get('/', AlbumController.getAllAlbums);
router.get('/:id', AlbumController.getAlbumById);
router.post('/', AlbumController.createAlbum);
router.get('/:id/tracks', AlbumController.getTracksByAlbum);
router.get('/:id/artists', AlbumController.getArtistsByAlbum);

export default router;