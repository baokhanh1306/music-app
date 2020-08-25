import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Loading, TrackList } from '../components';
import { playNewPlaylist } from '../redux/actions/audio/actions';
import { fetchArtists, removeArtists } from '../redux/actions/artist/actions';

const Wrapper = styled.div`
	display: flex;
	justify-content: flex-start;
	text-decoration: none;
	background-color: transparent;
    padding: 1.5rem 3rem;
`;

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
	margin: 1rem 3rem 0 2rem;
`;

const SubTitle = styled.h4`
    font-size: 1.6rem;
    margin: 0 3rem;
`;

const ArtistImg = styled.img`
	object-fit: contain;
	max-height: 10rem;
`;

const ArtistPage = () => {
	const params = useParams();
	const dispatch = useDispatch();
	const artists = useSelector((state) => state.artists);

	useFetch(fetchArtists, removeArtists, params.id, dispatch);
	usePlay(artists, playNewPlaylist, dispatch);

	const { name, tracks, loading, picture_small } = artists;

	if (loading) {
		return (
			<LoadingWrapper>
				<Loading />
			</LoadingWrapper>
		);
	}

	return (
		<Container>
			<Wrapper>
				<ArtistImg src={picture_small} />
				<Title>{name}</Title>
			</Wrapper>
            <SubTitle>Tracks</SubTitle>
			<TrackList tracks={tracks} />
		</Container>
	);
};

const useFetch = (fetchArtists, removeArtists, id, dispatch) => {
	useEffect(() => {
		dispatch(fetchArtists(id));
		return () => {
			dispatch(removeArtists());
		};
	}, [id]);
};

const usePlay = (artists, playNewPlaylist, dispatch) => {
	useEffect(() => {
		if (!!artists.tracks) {
			const playlist = artists.tracks.map((track) => {
				return {
					name: track.title,
					musicSrc: track.url,
					cover: track.album.cover_small,
					duration: 30,
				};
			});
			dispatch(playNewPlaylist(playlist));
		}
	}, [artists]);
};

export default ArtistPage;
