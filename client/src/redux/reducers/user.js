import * as types from '../actions/user/types';

const initialState = {
    isAuthenticating: false,
    currentUser: null,
    errorMsg: null
};

export default (state = initialState, action) => {
    switch (action.type) {
		case types.LOGIN_REQUEST:
            return { ...state, isAuthenticating: true };
        case types.SIGNUP_FAILURE:
		case types.LOGIN_FAILURE:
            return { ...state, isAuthenticating: false, errorMsg: action.payload };
        case types.LOGIN_SUCCESS:
            return { errorMsg: null, isAuthenticating: false, currentUser: action.payload };
        case types.LOGOUT:
            return { isAuthenticating: false, currentUser: null, errorMsg: null };
        case types.SIGNUP_REQUEST:
            return { ...state, isAuthenticating: true };
        case types.SIGNUP_SUCCESS:
            return { errorMsg: null, isAuthenticating: false };            
		default:
			return state;
	}
};

