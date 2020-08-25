import { Router } from 'express';
import { SearchController } from '../controllers';


const router = Router();

router.get('/', SearchController.searchAll);
router.get('/tracks', SearchController.searchTrack);
router.get('/albums', SearchController.searchAlbum);
router.get('/artists', SearchController.searchArtist);

export default router;