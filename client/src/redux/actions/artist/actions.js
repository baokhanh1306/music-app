import * as types from './types';
import axios from 'axios';

export const fetchArtists = (id) => async (dispatch) => {
	dispatch({ type: types.ARTIST_LOADING });
    const res = await axios.get(`/artists/${id}`);
	await dispatch({ type: types.GET_ARTISTS, payload: res.data });
	dispatch({ type: types.ARTIST_FINISHED });
};

export const removeArtists = () => ({
	type: types.ARTIST_LOADING,
});