import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '../hooks';
import { useSelector, useDispatch } from 'react-redux';
import {
	AlbumList,
	MainSidebar,
	ArtistList,
	Loading,
	TrackList,
	Playlist,
	PlaylistModal,
} from '../components';
import {
	getAlbums,
	getArtists,
	getTracks,
	clear,
	setSelectedMenu,
	removeMenu,
	getPlaylists,
} from '../redux/actions/main/actions';
import {
	fetchPlaylists,
	removePlaylist,
} from '../redux/actions/playlist/actions';
import styled from 'styled-components';
import Modal from 'react-modal';
import Pagination from '../components/Pagination';

const Wrapper = styled.div`
	display: flex;
`;

const ContentWrapper = styled.div`
	flex: 1;
	padding: 1rem 1rem;
`;

const LoadingWrapper = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
`;

const Main = () => {
	let query = useQuery();
	let { name } = useParams();
	const dispatch = useDispatch();
	const mainState = useSelector((state) => state.main);
	const playlistState = useSelector((state) => state.playlists);

	useEffect(() => {
		dispatch(fetchPlaylists(1));
		return () => {
			removePlaylist();
		};
	}, [name]);

	const { playlists } = playlistState;

	useEffect(() => {
		dispatch(setSelectedMenu(name));
		return () => {
			dispatch(removeMenu());
		};
	}, [name]);

	useFetch(
		query.get('page'),
		getArtists,
		getAlbums,
		getTracks,
		getPlaylists,
		clear,
		dispatch,
		name
	);

	const { data, loading, total, totalPage, page, pageSize } = mainState;
	const content = loading ? (
		<LoadingWrapper>
			<Loading />
		</LoadingWrapper>
	) : name === 'albums' ? (
		<AlbumList albums={data} page={page} totalPage={totalPage} url={`main/${name}`}/>
	) : name === 'artists' ? (
		<ArtistList artists={data} />
	) : name === 'tracks' ? (
		<TrackList tracks={data} addBtn playlists={playlists} />
	) : (
		<Playlist playlists={data} />
	);

	return (
		<Wrapper>
			<MainSidebar
				flex={0.2}
				selected={mainState.selected}
				categories={mainState.categories}
				query={query.get('q')}
			/>
			<ContentWrapper>
				{content}
				<Pagination page={page} totalPage={totalPage} name={`main/${name}`} />
			</ContentWrapper>
		</Wrapper>
	);
};

const useFetch = (
	page,
	getArtists,
	getAlbums,
	getTracks,
	getPlaylists,
	clear,
	dispatch,
	name
) => {
	useEffect(() => {
		const fetchData = async () => {
			if (name === 'artists') {
				await dispatch(getArtists(page));
			} else if (name === 'albums') {
				await dispatch(getAlbums(page));
			} else if (name === 'tracks') {
				await dispatch(getTracks(page));
			} else {
				await dispatch(getPlaylists(page));
			}
		};
		fetchData();
		return () => {
			dispatch(clear());
		};
	}, [page, name]);
};

export default Main;
