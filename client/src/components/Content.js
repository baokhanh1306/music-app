import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
	min-height: calc(100vh - 6rem);
	width: 80%;
	margin: 0 auto;
`;

const Content = ({ children }) => {
	return <MainContainer>{children}</MainContainer>;
};

export default Content;
