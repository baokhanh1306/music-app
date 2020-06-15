import { Track } from '../models';
import catchAsync from '../middlewares/catchAsync';

const getAllTracks = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const tracks = await Track.find()
    .sort({ name: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  const total = await Track.countDocuments({});
  res.json({
    total,
    page,
    pageSize,
    tracks,
  });
});

const getTrackById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const track = await Track.findById(id);
  res.json(track);
});

const createTrack = catchAsync(async (req, res, next) => {
  const track = new Track(req.body);
  await track.save();
  res.json({ message: 'Create track successfuly' });
});

export default {
  getAllTracks,
  getTrackById,
  createTrack,
};
