import mongoose from 'mongoose';
import { Artist, Album } from '.';

const trackSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    }],
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    },
    url: {
        type: String
    },
    duration: Number,
    release_date: String
});

trackSchema.pre('save', async function(next) {
    const { _id, artists, album } = this; 
    await Artist.updateMany({
        "_id": {
            $in: artists
        },
        "tracks": { 
            $ne: _id
        }
    },{
        "$push": {
            "tracks": _id
        }
    });
    await Album.update({
        _id: album,
        "tracks": {
            $ne: _id
        }
    },{
        "$push": {
            "tracks": _id
        }
    });
    next();
});

trackSchema.index({ title: 'text' });

export default mongoose.model('Track', trackSchema);