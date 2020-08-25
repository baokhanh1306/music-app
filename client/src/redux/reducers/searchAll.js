import * as types from '../actions/search/types';

const initialState = {
    tracks: [],
    albums: [],
    artists: [],
    loading: true
}

export default (state = initialState, action) => {
	switch (action.type) {
		case types.SEARCH_ALL_LOADING:
			return { ...state, loading: true };
		case types.SEARCH_ALL_FINISHED:
			return { ...state, loading: false };
		case types.SEARCH_ALL:
			return { ...state, ...action.payload.data };
		default:
			return state;
	}
};
