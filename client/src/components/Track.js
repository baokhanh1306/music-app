import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { playNewPlaylist } from '../redux/actions/audio/actions';
import { PlaylistModal } from '.';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Wrapper = styled.div`
	display: flex;
	justify-content: flex-start;
	text-decoration: none;
	background-color: var(--color-primary);
	padding: 1rem;

	&:hover {
		background-color: var(--color-background);
	}
`;

const InfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
`;

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: space-around;
	flex: 1;
`;

const TitleDateWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

const DateWrapper = styled.div`
	display: flex;
	justify-content: flex-start;
	width: 10rem;
`;

const Date = styled.p`
	font-size: 1.2rem;
	font-weight: 400;
	color: var(--color-text);
	margin: 0.5rem 0;
	line-height: 1.4;
`;

const Title = styled.h3`
	font-size: 1.4rem;
	font-weight: 400;
	color: var(--color-text);
	margin: 0.5rem 1.5rem;
	line-height: 1.4;
	flex: 3;
`;

const ArtistName = styled.h4`
	font-size: 1.2rem;
	font-weight: 400;
	color: var(--color-text);
	margin: 0 1.5rem;
	line-height: 1.4;
`;

const TrackImg = styled.img`
	object-fit: contain;
	max-height: 10rem;
`;

const Button = styled.button`
	background-color: transparent;
	outline: none;
	border: none;
	padding: 0.5rem;

	&:hover {
		background-color: #a8a5a5;
		opacity: 0.8;
		border-radius: 1rem;
	}
`;

const Track = ({ trackId, title, artists, album, release_date, deleteBtn, handleDelete, addBtn, url, cover, handleClick, playlists }) => {
	const [isOpen, setIsOpen] = useState(false);

	const openModal = (e) => {
		e.stopPropagation();
		setIsOpen(true);
	}

	const closeModal = () => {
		setIsOpen(false);
	}

	
	if (!!!album) {
		return null;
	}

	let trackCover = cover ? cover : album.cover_small;
	
	return (
		<Wrapper onClick={handleClick}>
			{addBtn && <PlaylistModal isOpen={isOpen} closeModal={closeModal} playlists={playlists} trackId={trackId} />}
			<TrackImg src={trackCover} />
			<InfoWrapper>
				<TitleDateWrapper>
					<Title>{title}</Title>
					<ButtonWrapper>
						{deleteBtn && <Button onClick={handleDelete}><FontAwesomeIcon icon='trash' /></Button>}
						{addBtn && <Button onClick={openModal}><FontAwesomeIcon icon='plus' /></Button>}
						<DateWrapper>
							<Date>{release_date}</Date>
						</DateWrapper>
					</ButtonWrapper>
				</TitleDateWrapper>
				{artists.map(({ name }) => (
					<ArtistName>{name}</ArtistName>
				))}
			</InfoWrapper>
		</Wrapper>
	);
};

export default Track;
