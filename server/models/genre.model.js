import mongoose from 'mongoose';

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    picture_small: String,
    picture_medium: String,
    picture_big: String,
    picture_xl: String
});


export default mongoose.model('Genre', genreSchema);