import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addTrackToPlaylist } from '../redux/actions/tracks/action';

const Title = styled.h2`
	text-align: center;
	font-size: 1.4rem;
	margin-bottom: 1rem;
`;

const Input = styled.input`
    margin: 0.5rem 0.5rem;
`;

const Label = styled.label`
    font-size: 1.4rem;
    line-height: 1.4rem;
`;

const Button = styled.button`
    color: var(--color-primary);
	padding: 0.5rem 1rem;
	margin: 1rem 2rem;
	font-size: 1.4rem;
	border-radius: 0.8rem;

	&:hover {
		background-color: #e04c4c;
		opacity: 0.8;
	}
`;

const PlaylistModal = ({ isOpen, closeModal, playlists, trackId }) => {
	const dispatch = useDispatch();
	const [id, setId] = useState('');
	const modalStyles = {
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
			paddingTop: '1rem',
		},
    };
    
    const handleSubmit = (e) => {
        dispatch(addTrackToPlaylist(trackId,id));
        closeModal();
	};
	
	const handleChange = (e) => {
		e.stopPropagation();
		setId(e.currentTarget.value);
	}
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={closeModal}
			style={modalStyles}
			contentLabel="Choose a playlist"
		>
			<Title>Choose a playlist</Title>
			{playlists.map(({ name, _id }) => (
				<>
					<Input
						type="radio"
						id={name}
						name="playlist"
						value={_id}
						onChange={handleChange}
					/>
					<Label for={name}>{name}</Label>
					<br />
				</>
			))}
			<Button onClick={handleSubmit}>Confirm</Button>
		</Modal>
	);
};

export default PlaylistModal;
