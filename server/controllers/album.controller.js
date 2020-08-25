import { Album, Artist } from '../models';
import catchAsync from '../middlewares/catchAsync';

const getAllAlbums = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const albums = await Album.find()
    .sort({ name: 1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  const total = await Album.countDocuments({});
  res.json({
    total,
    totalPage: Math.ceil(total / pageSize),
    page,
    pageSize,
    data: albums,
  });
});

const getAlbumById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const album = await Album.findById(id).populate({
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
  res.json(album);
});

const createAlbum = catchAsync(async (req, res, next) => {
  const album = new Album(req.body);
  await album.save();
  res.json({ message: 'Create album succesfully' });
});

const getTracksByAlbum = catchAsync(async (req, res, next) => {
  const albumId = req.params.id;
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 10;
  const { tracks } = await Album.findById(albumId).populate('tracks');
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

const getArtistsByAlbum = catchAsync(async (req, res, next) => {
  const albumId = req.params.id;
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 10;
  const { artists } = await Album.findById(albumId).populate('artists');
  const data = artists.slice((page - 1) * pageSize, page * pageSize);
  const total = artists.length;
  res.json({
    total,
    totalPage: Math.ceil(total / pageSize),
    page,
    pageSize,
    data,
  });
});

export default {
  getAllAlbums,
  getAlbumById,
  createAlbum,
  getArtistsByAlbum,
  getTracksByAlbum,
};
