import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { Loading } from '.';

const ArtistWrapper = styled(Link)`
	display: flex;
	flex-direction: column;
	text-decoration: none;
	background-color: var(--color-primary);
	transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
	position: relative;
	transition: all 300ms cubic-bezier(0.215, 0.61, 0.355, 1);

	&:hover {
		transform: scale(1.03);
		::after {
			transform: scaleY(1);
			opacity: 1;
		}
	}

	&::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transform: scaleY(0);
		transform-origin: top;
		opacity: 0;
		z-index: -99;
		box-shadow: 0rem 2rem 5rem var(--shadow-color-dark);
		transition: all 100ms cubic-bezier(0.215, 0.61, 0.355, 1);
	}
`;

const ArtistImg = styled.img`
	width: 100%;
	height: 100%;
	object-fit: contain;
	box-shadow: 0rem 2rem 5rem var(--shadow-color);
	transition: all 100ms cubic-bezier(0.645, 0.045, 0.355, 1);

	${ArtistWrapper}:hover & {
		box-shadow: none;
	}

	@media ${(props) => props.theme.mediaQueries.smaller} {
		height: 28rem;
	}
`;

const ImgLoading = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	min-height: 300px;
	box-shadow: 0rem 2rem 5rem var(--shadow-color);
	transition: all 100ms cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const Title = styled.h2`
	text-align: center;
	font-size: 1.4rem;
	font-weight: 400;
	color: var(--color-text);
	margin: 1rem auto;
	line-height: 1.4;
	transition: color 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const Artist = ({ artist }) => {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		return () => {
			setLoaded(false);
		};
	}, []);

	return (
		<LazyLoad height={200} offset={200}>
			<ArtistWrapper to={`/artists/${artist._id}`}>
				{!loaded ? (
					<ImgLoading>
						<Loading />
					</ImgLoading>
				) : null}
				<ArtistImg
					onLoad={() => setLoaded(true)}
					style={!loaded ? { display: 'none' } : {}}
					src={artist.picture_big}
				/>
                <Title>{artist.name}</Title>
			</ArtistWrapper>
		</LazyLoad>
	);
};

export default Artist;
