import { Album } from '../models';
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
    totalPage: Math.ceil(total/pageSize),
    page,
    pageSize,
    albums,
  });
});

const getAlbumById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const album = await Album.findById(id);
  res.json(album);
});

const createAlbum = catchAsync(async (req, res, next) => {
    const album = new Album(req.body);
    await album.save();
    res.json({ message: 'Create album succesfully'});
});

export default { 
    getAllAlbums,
    getAlbumById,
    createAlbum
}

