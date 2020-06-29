import { Router } from 'express';
import { AlbumController } from '../controllers';

const router = Router();

router.get('/', AlbumController.getAllAlbums);
router.get('/:id', AlbumController.getAlbumById);
router.post('/', AlbumController.createAlbum);

export default router;