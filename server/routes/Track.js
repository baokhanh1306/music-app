import express from 'express';
import { TrackController } from '../controllers';
const router = express.Router();

router.get('/',TrackController.getAllTracks);
router.get('/:id', TrackController.getTrackById);
router.post('/', TrackController.createTrack);

export default router;