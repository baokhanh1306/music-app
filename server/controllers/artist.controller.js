import { Artist, Album } from '../models';
import catchAsync from '../middlewares/catchAsync';

const getAllArtists = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const artists = await Artist.find()
    .sort({ name: 1 })
    .limit(pageSize)
    .skip((page - 1) * pageSize);
  const total = await Artist.countDocuments({});
  res.json({
    total,
    totalPage: Math.ceil(total / pageSize),
    page,
    pageSize,
    data: artists,
  });
});

const getArtistById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const artist = await Artist.findById(id).populate({
    path: 'tracks',
    populate: [
      {
        path: 'album',
        model: 'Album',
      },
      {
        path: 'artists',
        model: 'Artist',
      },
    ],
  });
  res.json(artist);
});

const createArtist = catchAsync(async (req, res, next) => {
  const artist = new Artist(req.body);
  await artist.save();
  res.json({ message: 'Create track successfully' });
});

const getAlbumsByArtist = catchAsync(async (req, res, next) => {
  const artistId = req.params.id;
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 10;
  const { albums } = await Artist.findById(artistId).populate('albums');
  const data = albums.slice((page - 1) * pageSize, page * pageSize);
  const total = albums.length;
  res.json({
    total,
    totalPage: Math.ceil(total / pageSize),
    page,
    pageSize,
    data,
  });
});

const getTracksByArtist = catchAsync(async (req, res, next) => {
  const artistId = req.params.id;
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 10;
  const { tracks } = await Artist.findById(artistId).populate('tracks');
  const data = tracks.slice((page - 1) * pageSize, page * pageSize);
  const total = tracks.length;
  res.json({
    total,
    totalPage: Math.ceil(total / pageSize),
    page,
    pageSize,
    data,
  });
});

export default {
  getAllArtists,
  getArtistById,
  createArtist,
  getAlbumsByArtist,
  getTracksByArtist,
};
