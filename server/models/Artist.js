import mongoose from 'mongoose'

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
    }]
});

export default mongoose.model('Aritst', artistSchema);
