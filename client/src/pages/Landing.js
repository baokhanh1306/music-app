import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MainSection = styled.section`
	display: flex;
	align-items: stretch;
	justify-content: space-between;
	flex-grow: 1;
    height: calc(100vh - 6rem);
`;

const ImageWrapper = styled.div`
	flex-grow: 1;
	flex-direction: column;
	display: flex;
	align-items: stretch;
	justify-content: flex-end;
`;

const LandingImage = styled.div`
	background-image: url(../landing-page-girl.png);
	flex-grow: 1;
	max-height: 70vh;
	min-width: 30vw;
	background-size: contain;
	background-repeat: no-repeat;
	background-position: bottom;
`;

const ActionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 1rem;
    margin-right: 1rem;
    align-self: center;
`;

const Title = styled.h1`
	font-weight: 500;
	font-size: 5rem;
	margin-bottom: 1rem;
	margin-top: 0;
`;

const Subtitle = styled.span`
	font-weight: 500;
	font-size: 2rem;
	margin-bottom: 2rem;
`;

const Button = styled(Link)`
	color: var(--color-primary);
	background-color: var(--color-secondary);
	padding: 1rem;
	text-decoration: none;
	font-size: 2rem;

    &::hover {
        opacity: 0.1;
    }
`;

const Landing = () => {
	return (
		<MainSection>
			<ImageWrapper>
				<LandingImage />
			</ImageWrapper>
			<ActionWrapper>
				<Title>Hear the world's sounds</Title>
				<Subtitle>
					Explore the largest community of artists, bands, podcasters and
					creators of music & audio.
				</Subtitle>
				<Button to="/login">Join now</Button>
			</ActionWrapper>
		</MainSection>
	);
};

export default Landing;
