import express from 'express';
import { PlaylistController } from '../controllers';
import auth from '../middlewares/auth';
const router = express.Router();


router.get('/:id', PlaylistController.getPlaylistById);
router.get('/users/user',auth, PlaylistController.getAllPlaylistByUser);
router.post('/',auth, PlaylistController.createPlaylist);
router.delete('/:id', PlaylistController.deletePlaylist);
router.put('/tracks/:id', PlaylistController.addTrackToPlaylist);
router.delete('/tracks/:id', PlaylistController.deleteTrackFromPlaylist);
router.put('/fav/:id', PlaylistController.addPlaylistToFav);

export default router;