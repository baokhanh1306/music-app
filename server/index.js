import express from "express";
import mongoose from 'mongoose';
import {
  AlbumRoute,
  ArtistRoute,
  PlaylistRoute,
  TrackRoute,
  UserRoute,
} from "./routes";
import dotenv from 'dotenv';
dotenv.config();


mongoose.connect(process.env.MONGODB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connect to dabase'))
.catch((error) => console.log(error));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/artist", ArtistRoute);
app.use("/album", AlbumRoute);
app.use("/playlist", PlaylistRoute);
app.use("/track", TrackRoute);
app.use("/user", UserRoute);

const port = process.env.port || 5000;
app.listen(port, () => console.log(`App listen on port ${port}`));
