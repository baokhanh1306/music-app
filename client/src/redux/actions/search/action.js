import * as types from './types';
import axios from 'axios';

export const searchTracks = (query, page) => async (dispatch) => {
	dispatch({ type: types.SEARCH_LOADING });
	const res = await axios.get(`/search/tracks`, {
		params: {
			q: query,
			page,
		},
	});
	await dispatch({
		type: types.SEARCH_TRACKS,
		payload: res.data,
	});
	dispatch({ type: types.SEARCH_FINISHED });
};

export const searchArtists = (query, page) => async (dispatch) => {
	dispatch({ type: types.SEARCH_LOADING });
	const res = await axios.get(`/search/artists`, {
		params: {
			q: query,
			page,
		},
	});
	await dispatch({
		type: types.SEARCH_ARTISTS,
		payload: res.data,
	});
	dispatch({ type: types.SEARCH_FINISHED });
};

export const searchAlbums = (query, page) => async (dispatch) => {
	dispatch({ type: types.SEARCH_LOADING });
	const res = await axios.get(`/search/albums`, {
		params: {
			q: query,
			page,
		},
	});
	await dispatch({
		type: types.SEARCH_ALBUMS,
		payload: res.data,
	});
	dispatch({ type: types.SEARCH_FINISHED });
};

export const searchAll = (query) => async (dispatch) => {
	dispatch({ type: types.SEARCH_ALL_LOADING });
	const res = await axios.get(`/search`, {
		params: {
			q: query,
		},
	});
	await dispatch({
		type: types.SEARCH_ALL,
		payload: res.data,
	});
	dispatch({ type: types.SEARCH_ALL_FINISHED });
};

export const clearSearch = () => ({
	type: types.SEARCH_LOADING,
});

export const clearSearchAll = () => ({
	type: types.SEARCH_ALL_LOADING,
});
