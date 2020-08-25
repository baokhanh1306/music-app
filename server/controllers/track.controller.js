import { Track } from '../models';
import catchAsync from '../middlewares/catchAsync';

const getAllTracks = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const tracks = await Track.find()
    .sort({ name: 1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .populate({
      path: 'album',
      select: 'cover_small',
    })
    .populate({
      path: 'artists',
      select: 'name',
    });
  const total = await Track.countDocuments({});
  res.json({
    total,
    totalPage: Math.ceil(total / pageSize),
    page,
    pageSize,
    data: tracks,
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
  res.json({ message: 'Create track successfully' });
});

const getArtistsByTrack = catchAsync(async (req, res, next) => {
  const trackId = req.params.id;
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 10;
  const { artists } = await Track.findById(trackId).populate('artists');
  const total = artists.length;
  const data = artists.slice((page - 1) * pageSize, page * pageSize);
  res.json({
    total,
    totalPage: Math.ceil(total / pageSize),
    page,
    pageSize,
    data,
  });
});

const getAlbumByTrack = catchAsync(async (req, res, next) => {
  const trackId = req.params.id;
  const { album } = await Track.findById(trackId).populate('album');
  res.json({
    data: album,
  });
});

export default {
  getAllTracks,
  getTrackById,
  createTrack,
  getAlbumByTrack,
  getArtistsByTrack,
};
