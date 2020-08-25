import React, { useEffect } from 'react';
import { useQuery } from '../hooks';
import { useSelector, useDispatch } from 'react-redux';
import { searchAll, clearSearchAll } from '../redux/actions/search/action';
import { setSelectedMenu, removeMenu } from '../redux/actions/config/actions';
import { fetchPlaylists, removePlaylist } from '../redux/actions/playlist/actions';
import { AlbumList, Sidebar, ArtistList, Loading, TrackList } from '../components';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
`;

const ContentWrapper = styled.div`
	flex: 1;
`;

const LoadingWrapper = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
`;

const NotFound = styled.h2`
	text-align: center;
	font-size: 1.6rem;
	margin: auto auto;
`;

const Title = styled.h3`
	font-size: 1.8rem;
	margin: 1rem 3rem 0 3rem; 
`;

const SearchAll = () => {
	let query = useQuery();
	const search = useSelector((state) => state.searchAll);
	const config = useSelector((state) => state.config);
	const dispatch = useDispatch();
	const playlistState = useSelector((state) => state.playlists); 
	
	useEffect(() => {
		dispatch(fetchPlaylists(1));
		return () => {
			removePlaylist();
		}
	}, []);

	const { playlists } = playlistState;

	useEffect(() => {
		dispatch(setSelectedMenu('all'));
		return () => {
			dispatch(removeMenu());
		};
	}, []);

	useSearchAll(query.get('q'), searchAll, clearSearchAll, dispatch);

	const { artists, tracks, albums, loading } = search;

	const content = loading ? (
		<LoadingWrapper>
			<Loading />
		</LoadingWrapper>
	) : albums.length === 0 && tracks.length === 0 && artists.length === 0 ? (
		<LoadingWrapper>
			<NotFound>Not found</NotFound>
		</LoadingWrapper>
	) : (
		<>
			<Title>Tracks</Title>
			<TrackList tracks={tracks} addBtn playlists={playlists}/>
			<Title>Albums</Title>
			<AlbumList albums={albums} />
			<Title>Artists</Title>
			<ArtistList artists={artists} />
		</>
	);
	return (
		<Wrapper>
			<Sidebar flex={0.2} config={config} query={query.get('q')} />
			<ContentWrapper>{content}</ContentWrapper>
		</Wrapper>
	);
};

const useSearchAll = (query, searchAll, clearSearchAll, dispatch) => {
	useEffect(() => {
		dispatch(searchAll(query));
		return () => {
			dispatch(clearSearchAll());
		};
	}, [query]);
};

export default SearchAll;
