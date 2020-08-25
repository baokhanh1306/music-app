import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Loading, TrackList } from '../components';
import {
	fetchPlaylist,
	removePlaylist,
} from '../redux/actions/playlist/actions';
import { playNewPlaylist } from '../redux/actions/audio/actions';
import { removeTrackFromPlaylist } from '../redux/actions/tracks/action';

const Container = styled.div`
	height: calc(100vh - 6rem);
	display: flex;
	flex-direction: column;
`;

const LoadingWrapper = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
`;

const Title = styled.h3`
	font-size: 1.8rem;
	margin: 1rem 3rem 0 3rem; 
`;

const NotAnySongs = styled.h1`
	align-self: center;
	font-size: 2rem;
	margin: auto auto;
`;

const PlaylistPage = () => {
	const params = useParams();
	const dispatch = useDispatch();
	const playlists = useSelector((state) => state.playlists);

	useFetch(fetchPlaylist, removePlaylist, params.id, dispatch);
	usePlay(playlists, playNewPlaylist, dispatch);

	const { name, tracks, loading } = playlists;

	if (loading || !!!tracks) {
		return (
			<LoadingWrapper>
				<Loading />
			</LoadingWrapper>
		);
	}


	if (!!tracks && tracks.length === 0) {
		return (
			<Container>
				<NotAnySongs>There is not any songs</NotAnySongs>
			</Container>
		)
	}

	return (
		<Container>
			<Title>Playlist: {name}</Title>
			<TrackList tracks={tracks} deleteBtn playlistId={params.id} />
		</Container>
	);
};

const useFetch = (fetchPlaylist, removePlaylist, id, dispatch) => {
	useEffect(() => {
		dispatch(fetchPlaylist(id));
		return () => {
			dispatch(removePlaylist());
		};
	}, [id]);
};

const usePlay = (playlists, playNewPlaylist, dispatch) => {
    useEffect(() => {
        if (!!playlists.tracks) {
        const playlist = playlists.tracks.map(track => {
            return {
                name: track.title,
                musicSrc: track.url,
                cover: track.album.cover_small,
                duration: 30
            }
        })
        dispatch(playNewPlaylist(playlist));
    }
	}, [playlists]);
}

export default PlaylistPage;
