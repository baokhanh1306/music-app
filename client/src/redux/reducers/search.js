import * as types from '../actions/search/types';

export default (state = { loading: true }, action) => {
    switch (action.type) {
        case types.SEARCH_LOADING:
            return { ...state, loading: true };
        case types.SEARCH_FINISHED:
            return { ...state, loading: false };
        case types.SEARCH_ALBUMS:
        case types.SEARCH_ARTISTS:
        case types.SEARCH_TRACKS:    
            return { ...state, ...action.payload };
        default:
            return state;
    }
}