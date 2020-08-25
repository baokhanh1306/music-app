import * as types from '../actions/tracks/types';

export default (state = { loading: true }, action) => {
	switch (action.type) {
		case types.LOADING:
			return { ...state, loading: true };
		case types.FINISHED:
			return { ...state, loading: false };
		default:
			return state;
	}
};
