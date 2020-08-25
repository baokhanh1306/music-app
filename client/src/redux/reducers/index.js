import { combineReducers } from 'redux';
import searchAllReducer from './searchAll';
import configReducer from './config';
import searchReducer from './search';
import userReducer from './user';
import mainReducer from './main';
import tracksReducer from './tracks';
import playlistsReducer from './playlists';
import audioReducer from './audio';
import albumsReducer from './albums';
import artistReducer from './artists';

export default combineReducers({
	searchAll: searchAllReducer,
	config: configReducer,
	search: searchReducer,
	user: userReducer,
	main: mainReducer,
	track: tracksReducer,
	playlists: playlistsReducer,
	audio: audioReducer,
	albums: albumsReducer,
	artists: artistReducer,
});
