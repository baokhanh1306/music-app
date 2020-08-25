import * as types from '../actions/main/types';

const initialState = {
	categories: ['Tracks', 'Albums', 'Artists','Playlists'],
	loading: true,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_TRACKS:
		case types.FETCH_ALBUMS:
		case types.FETCH_ARTISTS:
        case types.FETCH_PLAYLISTS:    
			return { ...state, ...action.payload };
		case types.FETCH_LOADING:
			return { ...state, loading: true };
		case types.FETCH_FINISHED:
			return { ...state, loading: false };
		case types.SELECTED_MAIN_MENU:
			return { ...state, selected: action.payload };
		case types.REMOVE_MAIN_MENU:
			return { ...state, selected: null };
		default:
			return state;
	}
};
