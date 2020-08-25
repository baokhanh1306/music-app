import mongoose from 'mongoose';
import { Artist, Track } from '.';

const albumSchema = new mongoose.Schema({
    artists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    }],
    tracks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track'
    }],
    genres: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre'
    }],
    title: {
        type: String,
        required: true
    },
    release_date: {
        type: String
    },
    cover_small: String,
    cover_medium: String,
    cover_big: String,
    cover_xl: String
});

albumSchema.pre('save', async function(next) {
    const { _id, artists, tracks } = this; 
    await Artist.updateMany({
        "_id": {
            $in: artists
        },
        "albums": { 
            $ne: _id
        }
    },{
        "$push": {
            "albums": _id
        }
    });
    await Track.updateMany({
        "_id": {
            $in: tracks
        },
        "album": {
            $ne: _id
        }
    },{
        "$set": {
            "album": _id
        }
    });
    next();
});

albumSchema.index({title: 'text'});

export default mongoose.model('Album', albumSchema);
