import { Playlist } from '../models';
import catchAsync from '../middlewares/catchAsync';

const getPlaylistById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const playlist = await Playlist.findById(id)
        .populate({
            path: 'tracks',
            populate: [{
                path: 'album',
                model: 'Album'
            },{
                path: 'artists',
                model: 'Artist'
            }]
        });
  res.json(playlist);
});

const getAllPlaylistByUser = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const { _id } = req.user;
  const playlists = await Playlist.find({ user: _id });
  const total = playlists.length;
  const data = playlists.slice((page - 1) * pageSize, page * pageSize);
  res.json({
    total,
    totalPage: Math.ceil(total / pageSize),
    page,
    pageSize,
    data,
  });
});

const createPlaylist = catchAsync(async (req, res, next) => {
  const { _id } = req.user;
  const playlist = new Playlist({ ...req.body, user: _id });
  await playlist.save();
  res.json({ message: 'Create playlist successfully', playlist });
});

const deletePlaylist = catchAsync(async (req, res, next) => {
  console.log('ok');
  const id = req.params.id;
  const playlist = await Playlist.findByIdAndDelete(id);
  res.json({ message: 'Delete playlist successfully' });
});

const addPlaylistToFav = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const playlist = await Playlist.findByIdAndUpdate(id, { isFav: true });
  res.json({ message: 'Add playlist to favorite lists successfully' });
});

const addTrackToPlaylist = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const { track } = req.body;
  const playlist = await Playlist.findById(id);
  if (!playlist.tracks.includes(track)) {
    playlist.tracks.push(track);
    await playlist.save();
  }
  res.json({ message: 'Add track to playlist successfully', playlist });
});

const deleteTrackFromPlaylist = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const { track } = req.body;
  const playlist = await Playlist.findByIdAndUpdate(id, {
    $pull: { tracks: track },
  });
  res.json({ message: 'Delete track from playlist successfully', playlist });
});

export default {
  getPlaylistById,
  getAllPlaylistByUser,
  createPlaylist,
  addPlaylistToFav,
  addTrackToPlaylist,
  deletePlaylist,
  deleteTrackFromPlaylist,
};
