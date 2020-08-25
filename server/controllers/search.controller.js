import { Album, Track, Artist } from '../models';
import catchAsync from '../middlewares/catchAsync';

const searchTrack = catchAsync(async (req, res, next) => {
  const query = req.query.q || '';
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 10;
  const tracks = await Track.find({ $text: { $search: query } })
    .populate({
      path: 'album',
      select: 'cover_small',
    })
    .populate({
      path: 'artists',
      select: 'name',
    });
  const total = tracks.length;
  const data = tracks.slice((page - 1) * pageSize, page * pageSize);
  res.json({
    total,
    totalPage: Math.ceil(total / pageSize),
    page,
    pageSize,
    data,
  });
});

const searchAlbum = catchAsync(async (req, res, next) => {
  const query = req.query.q || '';
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 10;
  const albums = await Album.find({ $text: { $search: query } });
  const total = albums.length;
  const data = albums.slice((page - 1) * pageSize, page * pageSize);
  res.json({
    total,
    totalPage: Math.ceil(total / pageSize),
    page,
    pageSize,
    data,
  });
});

const searchArtist = catchAsync(async (req, res, next) => {
  const query = req.query.q || '';
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 10;
  const artists = await Artist.find({ $text: { $search: query } });
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

const searchAll = catchAsync(async (req, res, next) => {
  const query = req.query.q || '';
  const TRACKS_SIZE = 5;
  const ARTISTS_SIZE = 8;
  const ALBUMS_SIZE = 8;
  const artists = await Artist.find({ $text: { $search: query } })
    .skip(0)
    .limit(ARTISTS_SIZE);
  const albums = await Album.find({ $text: { $search: query } })
    .skip(0)
    .limit(ALBUMS_SIZE);
  const tracks = await Track.find({ $text: { $search: query } })
    .populate({
      path: 'album',
      select: 'cover_small',
    })
    .populate({
      path: 'artists',
      select: 'name',
    })
    .skip(0)
    .limit(TRACKS_SIZE);
  res.json({
    data: {
      artists,
      albums,
      tracks,
    },
  });
});

export default {
  searchTrack,
  searchAlbum,
  searchArtist,
  searchAll,
};
