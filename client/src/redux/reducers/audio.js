import * as types from '../actions/audio/types';

const initialState = {
	playlist: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case types.PLAY_NEW_PLAYLIST:
			return { ...state, playlist: action.payload };
		default:
			return state;
	}
};
