import { Artist } from '../models';
import catchAsync from '../middlewares/catchAsync';

const getAllArtists = catchAsync(async (req, res, next) => {
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 10;
    const artists = await Artist.find()
    .sort({name: 1})
    .limit(pageSize)
    .skip((page-1)*pageSize);
    const total = await Artist.countDocuments({});
    res.json({
        total,
        totalPage: Math.ceil(total/pageSize),
        page,
        pageSize,
        artists
    });
});

const getArtistById = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const artist = await Artist.findById(id);
    res.json(artist);
});

const createArtist = catchAsync(async (req, res, next) => {
    const artist = new Artist(req.body);
    await artist.save();
    res.json({message: 'Create track successfully'});
});

export default {
    getAllArtists,
    getArtistById,
    createArtist
};



