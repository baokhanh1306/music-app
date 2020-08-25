import React, { useState } from 'react';
import styled from 'styled-components';
import PlaylistItem from './PlaylistItem';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { addPlaylist, deletePlaylist } from '../redux/actions/main/actions';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	background-color: var(--color-primary);
	margin: 3rem 3rem;
	padding: 1.5rem 3rem;
`;

const Button = styled.button`
	color: var(--color-primary);
	padding: 0.5rem 1rem;
	margin: 0.5rem auto;
	font-size: 1.6rem;
	border-radius: 1rem;

	&:hover {
		background-color: #e04c4c;
		opacity: 0.8;
	}
`;

const Title = styled.h2`
	text-align: center;
	font-size: 1.4rem;
	margin-bottom: 1rem;
`;

const ModalButton = styled.button`
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

const Playlist = ({ playlists }) => {
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState(false);
	const [newName, setNewName] = useState('');

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

	const closeModal =() => {
		setIsOpen(false);
	}

	const handleClick = (e) => {
		setIsOpen(true);
	};

	const handleConfirm = (e) => {
		console.log(newName);
		dispatch(addPlaylist(newName));
		closeModal();
	}
	return (
		<Wrapper>
			<Modal
				isOpen={isOpen}
				onRequestClose={closeModal}
				style={modalStyles}
				>
					<Title>Your playlist name</Title>
					<input id="name"
						name="name"
						type="text"
						onChange={(e) => setNewName(e.currentTarget.value)}
						value={newName}
						placeholder="Name" />
					<ModalButton onClick={handleConfirm}>Confirm</ModalButton>	
				</Modal>

			{playlists.map(({ _id, name, tracks, isFav }) => {
                const handleDelete = (e) => {
					e.preventDefault();
                    dispatch(deletePlaylist(_id));
                }
				return (<PlaylistItem key={_id} name={name} tracks={tracks} isFav={isFav} handleDelete={handleDelete} id={_id} />);
			})}
			<Button onClick={handleClick}>Add playlist</Button>
		</Wrapper>
	);
};

export default Playlist;
