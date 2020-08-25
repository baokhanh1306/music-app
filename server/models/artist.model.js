import mongoose from 'mongoose'
import { Track, Album } from '.';

const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tracks: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Track'}
    ],
    albums: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    }],
    picture_small: String,
    picture_medium: String,
    picture_big: String,
    picture_xl: String
});

artistSchema.pre('save', async function(next) {
    const { _id, tracks, albums } = this;
    await Track.updateMany({
        "_id":{
            $in: tracks
        },
        "artists":{
            $ne: _id
        }
    },{
        "$push": {
            "artists": _id
        }
    });
    await Album.updateMany({
        "_id":{
            $in: albums
        },
        "artists": {
            $ne: _id
        }
    },{
        "$push": {
            "artists": _id
        }
    })
    next();
})

artistSchema.index({ name: 'text' });

export default mongoose.model('Artist', artistSchema);
