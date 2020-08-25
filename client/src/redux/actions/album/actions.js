import * as types from './types';
import axios from 'axios';

export const fetchAlbum = (id) => async (dispatch) => {
	dispatch({ type: types.LOADING });
    const res = await axios.get(`/albums/${id}`);
	await dispatch({ type: types.GET_ALBUMS, payload: res.data });
	dispatch({ type: types.FINISHED });
};

export const removeAlbums = () => ({
	type: types.LOADING,
});
