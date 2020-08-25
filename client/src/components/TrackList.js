import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Track from './Track';
import { useDispatch } from 'react-redux';
import { playNewPlaylist } from '../redux/actions/audio/actions';
import { removeTrackFromPlaylist } from '../redux/actions/tracks/action';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	background-color: var(--color-primary);
	margin: 3rem 3rem;
	padding: 1.5rem 3rem;
`;

const TrackList = ({ tracks, deleteBtn, addBtn, playlists, playlistId }) => {
	const dispatch = useDispatch();
	if (!!!tracks) {
		return null;
	}
	return (
		<Wrapper>
			{tracks.map(({ _id, title, artists, album, release_date, url }) => {
				const handleClick = (e) => {
					const playlist = [{
						name: title,
						musicSrc: url,
						cover: album.cover_small,
						duration: 30,
					}];
					dispatch(playNewPlaylist(playlist));
				};
				let handleDelete;
				if (!!deleteBtn) {
					handleDelete = (e) => {
						console.log('click');
						e.stopPropagation();
						dispatch(removeTrackFromPlaylist(_id, playlistId));
					};
				}
				return (
					<Track
						key={_id}
						title={title}
						artists={artists}
						album={album}
						release_date={release_date}
						deleteBtn={deleteBtn}
						addBtn={addBtn}
						url={url}
						handleClick={handleClick}
						handleDelete={handleDelete}
						playlists={playlists}
						trackId={_id}
					/>
				);
			})}
		</Wrapper>
	);
};

export default TrackList;
