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


const MainSidebar = ({ selected, categories }) => {
	return (
		<Wrapper flex={0.2}>
			<StickyBox offset={20}>
				<Title>Tags</Title>
				{categories.map(category => (
					<Tag key={category} title={category} selected={selected === category.toLowerCase() ? true : false} link={`main/${category.toLowerCase()}`} />
				))}
			</StickyBox>
		</Wrapper>
	);
};

export default MainSidebar;
