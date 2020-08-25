import React from 'react';
import { Artist } from '.';
import styled from 'styled-components';

const ArtistsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 25rem));
  justify-content: space-evenly;
  align-content: space-between;
  align-items: start;
  padding: 4rem 0;
  grid-gap: 4rem 2rem;
  background-color: var(--color-primary);
  margin: 3rem 3rem;
  height: 100%;

  @media ${props => props.theme.mediaQueries.small} {
    grid-template-columns: repeat(auto-fit, minmax(10rem, 23rem));
    justify-content: space-around;
    grid-gap: 4rem 1.5rem;
  }

  @media ${props => props.theme.mediaQueries.smaller} {
    grid-template-columns: repeat(auto-fit, minmax(10rem, 18rem));
    grid-gap: 4rem 1rem;
  }
`;

const ArtistList = ({artists, flex}) => {
	if (artists.length === 0) {
        return null;
    }
    return (
        <ArtistsWrapper flex={flex}>
            {artists.map(artist => (
                <Artist artist={artist} key={artist._id}/>
            ))}
        </ArtistsWrapper>
    )
};

export default ArtistList;
