import * as types from '../actions/config/types';

const initialState = {
	categories: ['All', 'Albums', 'Tracks', 'Artists'],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case types.SELECTED_MENU:
			return { ...state, selected: action.payload };
		case types.REMOVE_MENU:
			return { ...state, selected: null };
		default:
			return state;
	}
};
