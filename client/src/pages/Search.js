import React, { useEffect } from 'react';
import { useQuery } from '../hooks';
import { useSelector, useDispatch } from 'react-redux';
import {
	searchArtists,
	searchAlbums,
	searchTracks,
	clearSearch,
} from '../redux/actions/search/action';
import { setSelectedMenu, removeMenu } from '../redux/actions/config/actions';
import { fetchPlaylists, removePlaylist } from '../redux/actions/playlist/actions';
import { AlbumList, Sidebar, ArtistList, Loading, TrackList } from '../components';
import { useParams } from 'react-router-dom';
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

const Search = () => {
	let query = useQuery();
	const search = useSelector((state) => state.search);
	const config = useSelector((state) => state.config);
	const dispatch = useDispatch();
	const { name } = useParams();
	const playlistState = useSelector((state) => state.playlists); 
	
	useEffect(() => {
		dispatch(fetchPlaylists(1));
		return () => {
			removePlaylist();
		}
	}, []);

	const { playlists } = playlistState;

	useEffect(() => {
		dispatch(setSelectedMenu(name));
		return () => {
			dispatch(removeMenu());
		};
	}, [name]);

	useSearch(
		query.get('q'),
		query.get('page'),
		searchArtists,
		searchAlbums,
		searchTracks,
		clearSearch,
		dispatch,
		name
	);

	const { data, loading, total, totalPage, page, pageSize } = search;
	const content = loading ? (
		<LoadingWrapper>
			<Loading />
		</LoadingWrapper>
	) : total === 0 ? (
		<LoadingWrapper>
			<NotFound>Not Found </NotFound>
		</LoadingWrapper>
	) : name === 'albums' ? (
		<AlbumList albums={data} />
	) : name === 'artists' ? (
		<ArtistList artists={data} />
	) : (
		<TrackList tracks={data} addBtn playlists={playlists}/>
	);
	return (
		<Wrapper>
			<Sidebar flex={0.2} config={config} query={query.get('q')} />
			<ContentWrapper>{content}</ContentWrapper>
		</Wrapper>
	);
};

const useSearch = (
	query,
	page,
	searchArtists,
	searchAlbums,
	searchTracks,
	clearSearch,
	dispatch,
	name
) => {
	useEffect(() => {
		if (name === 'artists') {
			dispatch(searchArtists(query, page));
		} else if (name === 'albums') {
			dispatch(searchAlbums(query, page));
		} else {
			dispatch(searchTracks(query, page));
		}
		return () => {
			dispatch(clearSearch());
		};
	}, [query, page, name]);
};

export default Search;
