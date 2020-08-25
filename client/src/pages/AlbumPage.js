import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Loading, TrackList } from '../components';
import { playNewPlaylist } from '../redux/actions/audio/actions';
import { fetchAlbum, removeAlbums } from '../redux/actions/album/actions';

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

const AlbumPage = () => {
	const params = useParams();
	const dispatch = useDispatch();
	const albums = useSelector((state) => state.albums);

	useFetch(fetchAlbum, removeAlbums, params.id, dispatch);
	usePlay(albums, playNewPlaylist, dispatch);

	const { title, tracks, loading } = albums;

	if (loading) {
		return (
			<LoadingWrapper>
				<Loading />
			</LoadingWrapper>
		);
	}

	return (
		<Container>
			<Title>Album: {title}</Title>
			<TrackList tracks={tracks} cover={albums.cover_small} />
		</Container>
	);
};

const useFetch = (fetchAlbum, removeAlbums, id, dispatch) => {
	useEffect(() => {
		dispatch(fetchAlbum(id));
		return () => {
			dispatch(removeAlbums());
		};
	}, [id]);
};

const usePlay = (albums, playNewPlaylist, dispatch) => {
	useEffect(() => {
		if (!!albums.tracks) {
			const playlist = albums.tracks.map((track) => {
				return {
					name: track.title,
					musicSrc: track.url,
					cover: albums.cover_small,
					duration: 30,
				};
			});
			dispatch(playNewPlaylist(playlist));
		}
	}, [albums]);
};

export default AlbumPage;
