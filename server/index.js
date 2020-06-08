import express from "express";
import {
  AlbumRoute,
  ArtistRoute,
  PlaylistRoute,
  TrackRoute,
  UserRoute,
} from "./routes";

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
