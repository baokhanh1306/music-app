import mongoose from 'mongoose';
import { Artist, Album, Track} from '../models';

const trackSchema = new mongoose.Schema({
    name: {
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
        type: String,
        required: true
    },
    cover: {
        type: String
    }
});

trackSchema.pre('save', async function(next) {
    const track = this;
    const { _id, artists, album } = track; 
    artists.forEach(async (artistId) => {
        const artist = await Artist.findById(artistId);
        if (artist && !artist.tracks.includes(_id)) {
            artist.tracks = [...artist.tracks, _id];
            await artist.save();
        }
    });
    const foundAlbum = await Album.findById(album);
    if (foundAlbum && !foundAlbum.tracks.includes(_id)) {
        foundAlbum.tracks = [...foundAlbum, _id];
        await foundAlbum.save();
    }
    next();
});



export default mongoose.model('Track', trackSchema);