import * as types from '../actions/artist/types';

export default (state = { loading: true }, action) => {
	switch (action.type) {
		case types.ARTIST_LOADING:
			return { ...state, loading: true };
		case types.ARTIST_FINISHED:
			return { ...state, loading: false };
		case types.GET_ARTISTS:
			return { ...state, ...action.payload };
		default:
			return state;
	}
};
