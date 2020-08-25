import React from 'react';
import { Album, Pagination } from '.';
import styled from 'styled-components';

const AlbumsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 25rem));
  justify-content: space-evenly;
  align-content: space-between;
  align-items: start;
  padding: 4rem 0;
  grid-gap: 4rem 2rem;
  background-color: var(--color-primary);
  margin: 3rem 3rem;

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

const AlbumList = ({albums, flex}) => {
	if (albums.length === 0) {
        return <div>0 results</div>;
    }
    return (
        <AlbumsWrapper flex={flex}>
            {albums.map(album => (
                <Album album={album} key={album._id}/>
            ))}  
        </AlbumsWrapper>
    )
};

export default AlbumList;
