import express from 'express';
import mongoose from 'mongoose';
import {
  AlbumRoute,
  ArtistRoute,
  PlaylistRoute,
  TrackRoute,
  UserRoute,
} from './routes';
import dotenv from 'dotenv';
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connect to dabase'))
  .catch((error) => console.log(error));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/artists', ArtistRoute);
app.use('/albums', AlbumRoute);
app.use('/playlists', PlaylistRoute);
app.use('/tracks', TrackRoute);
app.use('/users', UserRoute);

const port = process.env.port || 5000;
app.listen(port, () => console.log(`App listen on port ${port}`));
