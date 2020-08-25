import * as types from '../actions/playlist/types';

const initialState = {
	playlists: [],
	loading: true
}

export default (state = initialState, action) => {
	switch (action.type) {
		case types.PLAYLIST_LOADING:
			return { ...state, loading: true };
		case types.PLAYLIST_FINISHED:
			return { ...state, loading: false };
		case types.GET_PLAYLIST:
			return { ...state, ...action.payload };
		case types.GET_PLAYLISTS:
			return { ...state, playlists: [...action.payload.data] };	
		default:
			return state;
	}
};
