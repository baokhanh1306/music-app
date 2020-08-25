import * as types from '../actions/album/types';

export default (state = { loading: true }, action) => {
	switch (action.type) {
		case types.LOADING:
			return { ...state, loading: true };
		case types.FINISHED:
			return { ...state, loading: false };
		case types.GET_ALBUMS:
			return { ...state, ...action.payload };
		default:
			return state;
	}
};
