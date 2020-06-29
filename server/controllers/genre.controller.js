import { Genre } from '../models';
import catchAsync from '../middlewares/catchAsync';

const getAllGenres = catchAsync(async (req, res, next) => {
    const genres = await Genre.find({});
    res.json(genres);
});

const getGenreById = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const genre = await Genre.findById(id);
    res.json(genre);
});

const createGenre = catchAsync(async (req, res, next) => {
    const genre = new Genre(req.body);
    await genre.save();
    res.json({ message: 'Create new genre successfully'});
});

export default {
    getAllGenres,
    getGenreById,
    createGenre
};