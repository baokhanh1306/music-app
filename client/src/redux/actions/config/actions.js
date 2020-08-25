import * as types from './types';

export const setSelectedMenu = (name) => (dispatch, getState) => {
	const { categories } = getState().config;

	if (!name) {
		dispatch({ type: types.REMOVE_MENU });
	} else if (categories.find((category) => category.toLowerCase() === name)) {
		dispatch({
			type: types.SELECTED_MENU,
			payload: name,
		});
	}
};

export const removeMenu = () => ({
    type: types.REMOVE_MENU
});
