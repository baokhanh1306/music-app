import { Router } from 'express';
import axios from '../middlewares/api';
import catchAsync from '../middlewares/catchAsync';
import { Artist, Track, Album, Genre } from '../models';
const router = Router();

router.post('/artist', catchAsync(async (req, res, next) => {
    const { id } = req.body;
    const { data: { name, picture_medium, picture_small, picture_big, picture_xl } } = await axios.get(`/artist/${id}`);
    const artist = new Artist({
        name,
        picture_small,
        picture_medium,
        picture_big,
        picture_xl
    });
    await artist.save();
    res.json(artist);
}))

router.post('/album', catchAsync(async (req, res, next) => {
    const { id } = req.body;
    const { data: { title, cover_small, cover_medium, cover_big, cover_xl, release_date, genres, artist, tracks} } = await axios.get(`/album/${id}`);
    const foundArtist = await Artist.findOne({name: artist.name});
    const albumGenres = await Promise.all(genres.data.map(async(genre) => {
        const genreFound = await Genre.findOne({name: genre.name});
        return genreFound._id;
    }));
    const album = new Album({
        title,
        release_date,
        artists: [foundArtist._id],
        cover_small,
        cover_medium,
        cover_big,
        cover_xl,
        genres: albumGenres
    });
    await album.save();
    tracks.data.forEach(async(track) => {
        const newTrack = new Track({
            artists: [foundArtist._id],
            album: album._id,
            title: track.title,
            url: track.preview,
            duration: 30,
            release_date
        });
        await newTrack.save();
    });
    res.json(album);
}))

router.post('/genre', catchAsync(async (req, res, next) => {
    const { data: { data }} = await axios.get('/genre');
    data.forEach(async({name, picture_small, picture_medium, picture_big, picture_xl}) => {
        const genre = new Genre({
            name,
            picture_small,
            picture_medium,
            picture_big,
            picture_xl
        });
        await genre.save();
    });
    res.json({ message: 'Save genres' });
}));

export default router;