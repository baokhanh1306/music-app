import AlbumRoute from './Album';
import ArtistRoute from './Artist';
import PlaylistRoute from './Playlist';
import TrackRoute from './Track';
import UserRoute from './User';
import { Router } from 'express';

const router = Router();

router.use('/artists', ArtistRoute);
router.use('/albums', AlbumRoute);
router.use('/playlists', PlaylistRoute);
router.use('/tracks', TrackRoute);
router.use('/users', UserRoute);

export default router;