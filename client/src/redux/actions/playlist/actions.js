import * as types from './types';
import axios from 'axios';


export const fetchPlaylist = (id) => async(dispatch) => {
    dispatch({ type: types.PLAYLIST_LOADING });
    const res = await axios.get(`/playlists/${id}`);
    await dispatch({ type: types.GET_PLAYLIST, payload: res.data });
    dispatch({ type: types.PLAYLIST_FINISHED });
}

export const fetchPlaylists = (page) => async (dispatch) => {
    dispatch({ type: types.PLAYLIST_LOADING });
    const res = await axios.get(`/playlists/users/user`, {
        params: {
            page
        },
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    });
    await dispatch({
        type: types.GET_PLAYLISTS,
        payload: res.data
    });
    dispatch({
        type: types.PLAYLIST_FINISHED
    });
};

export const removePlaylist = () => ({
    type: types.PLAYLIST_LOADING
});