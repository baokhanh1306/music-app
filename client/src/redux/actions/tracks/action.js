import * as types from './types';
import axios from 'axios';
import history from '../../../utils/history';
import { fetchPlaylist } from '../playlist/actions';

export const addTrackToPlaylist = (id, playlist) => async (dispatch) => {
	dispatch({ type: types.LOADING });
	await axios.put(`/playlists/tracks/${playlist}`, { track: id });
    dispatch({ type: types.FINISHED });
};

export const removeTrackFromPlaylist = (trackId,playlistId) => async(dispatch) => {
    dispatch({ type: types.LOADING });
	await axios.delete(`/playlists/tracks/${playlistId}`, {data: { track: trackId }});
	dispatch({ type: types.FINISHED });
	dispatch(fetchPlaylist(playlistId));
}