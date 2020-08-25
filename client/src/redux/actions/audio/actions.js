import * as types from './types';


export const playNewPlaylist = (playlist) => {
    return {
        type: types.PLAY_NEW_PLAYLIST,
        payload: playlist
    };
};