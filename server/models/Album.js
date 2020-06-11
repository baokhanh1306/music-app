import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema({
    artists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    }],
    tracks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track'
    }],
    name: {
        type: String,
        required: true
    },
    cover: {
        type: String
    }
})

export default mongoose.model('Album', albumSchema);
