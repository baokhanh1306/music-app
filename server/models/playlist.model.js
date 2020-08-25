import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tracks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Track'
        }
    ],
    isFav: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default mongoose.model('Playlist', playlistSchema);