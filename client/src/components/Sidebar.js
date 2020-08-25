import React from 'react';
import styled from 'styled-components';
import StickyBox from 'react-sticky-box';
import { Tag } from '.';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	margin-top: 3rem;
    flex: ${(props) => props.flex};
`;

const Title = styled.h1`
	font-size: 2rem;
	text-transform: uppercase;
	font-weight: 500;
	color: #909ca8;
`;


const Sidebar = ({ flex, config: {selected, categories}, query }) => {
	return (
		<Wrapper flex={flex}>
			<StickyBox offset={20}>
				<Title>Tags</Title>
				{categories.map(category => (
					<Tag title={category} selected={selected === category.toLowerCase() ? true : false} link={`search/${category.toLowerCase()}?q=${query}`} />
				))}
			</StickyBox>
		</Wrapper>
	);
};

export default Sidebar;
