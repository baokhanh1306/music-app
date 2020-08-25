import * as types from './types';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import history from '../../../utils/history';

export const login = (credentials) => async (dispatch) => {
	try {
		dispatch({ type: types.LOGIN_REQUEST });
		const res = await axios.post('/users/login', credentials);
		const { email, token } = res.data;
		localStorage.setItem('token', token);
		dispatch({ type: types.LOGIN_SUCCESS, payload: email });
	} catch (error) {
		dispatch({
			type: types.LOGIN_FAILURE,
			payload: error.response.data.message,
		});
	}
};

export const signup = (credentials) => async (dispatch) => {
	try {
		dispatch({ type: types.SIGNUP_REQUEST });
		const res = await axios.post('/users/signup', credentials);
		dispatch({ type: types.SIGNUP_SUCCESS });
		history.push('/login');
	} catch (error) {
		dispatch({
			type: types.SIGNUP_FAILURE,
			payload: error.response.data.message,
		});
	}
};

export const logout = () => {
	localStorage.removeItem('token');
	return { type: types.LOGOUT };
};

export const removeMsg = () => {
	return {
		type: types.LOGOUT,
	};
}

export const setUser = (token) => {
	const { email } = jwtDecode(token);
	return { type: types.LOGIN_SUCCESS, payload: email };
};
