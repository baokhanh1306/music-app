import * as types from './types';
import axios from 'axios';


export const getAlbums = (page) => async (dispatch) => {
    dispatch({ type: types.FETCH_LOADING });
    const res = await axios.get(`/albums`, {
        params: {
            page,
            pageSize: 9
        }
    });
    await dispatch({
        type: types.FETCH_ALBUMS,
        payload: res.data
    });
    dispatch({
        type: types.FETCH_FINISHED
    });
};

export const getArtists = (page) => async (dispatch) => {
	dispatch({ type: types.FETCH_LOADING });
	const res = await axios.get(`/artists`, {
		params: {
            page,
            pageSize: 9
		},
	});
	await dispatch({
		type: types.FETCH_ARTISTS,
		payload: res.data,
	});
	dispatch({
		type: types.FETCH_FINISHED,
	});
};

export const getTracks = (page) => async (dispatch) => {
    dispatch({ type: types.FETCH_LOADING });
    const res = await axios.get(`/tracks`, {
        params: {
            page
        }
    });
    await dispatch({
        type: types.FETCH_TRACKS,
        payload: res.data
    });
    dispatch({
        type: types.FETCH_FINISHED
    });
};

export const getPlaylists = (page) => async (dispatch) => {
    dispatch({ type: types.FETCH_LOADING });
    const res = await axios.get(`/playlists/users/user`, {
        params: {
            page
        },
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    });
    await dispatch({
        type: types.FETCH_PLAYLISTS,
        payload: res.data
    });
    dispatch({
        type: types.FETCH_FINISHED
    });
};

export const clear = () => ({
    type: types.FETCH_LOADING
});

export const setSelectedMenu = (name) => (dispatch, getState) => {
	const { categories } = getState().main;

	if (!name) {
		dispatch({ type: types.REMOVE_MAIN_MENU });
	} else if (categories.find((category) => category.toLowerCase() === name)) {
		dispatch({
			type: types.SELECTED_MAIN_MENU,
			payload: name,
		});
	}
};

export const removeMenu = () => ({
    type: types.REMOVE_MAIN_MENU
});

export const addPlaylist = (playlist) => async(dispatch) => {
    dispatch({ type: types.FETCH_LOADING });
    const res = await axios.post(`/playlists`,{ name: playlist }, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    });
    dispatch({
        type: types.FETCH_FINISHED
    });
    dispatch(getPlaylists(1));
};

export const deletePlaylist = (id) => async(dispatch) => {
    dispatch({ type: types.FETCH_LOADING });
    await axios.delete(`/playlists/${id}`, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    });
    dispatch({
        type: types.FETCH_FINISHED
    });
    dispatch(getPlaylists(1));
}