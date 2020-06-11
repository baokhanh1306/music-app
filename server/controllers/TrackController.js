import { Track } from '../models';

const getAllTracks = async (req, res, next) => {
    try{
        const page  = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const tracks = await Track.find()
                        .sort({name: -1})
                        .limit(pageSize)
                        .skip(pageSize * (page-1));
        const total = await Track.countDocuments({});
        res.json({
            total,
            page,
            pageSize,
            tracks
        });
    } catch(err) {
        res.status(400).json(err);
    }
}

const getTrackById = async (req, res, next) => {
    try{
        const id = req.params.id;
        const track = await Track.findById(id);
        res.json(track);
    } catch(err) {
        res.status(400).json(err);
    }
}

const createTrack = async (req, res, next) => {
    try{
        const track = new Track(req.body);
        await track.save();
        res.json({ message: "Create track successfuly"});
    } catch(err) {
        res.json(err);
    }
}

export default {
    getAllTracks,
    getTrackById,
    createTrack
};