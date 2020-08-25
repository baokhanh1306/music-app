import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Button from './Button';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: ${(props) => {
		if (props.type === 'one') {
			return 'flex-start';
		} else if (props.type === 'both') {
			return 'space-between';
		} else {
			return 'flex-end';
		}
	}};
`;

const WrapperLink = styled(Link)`
	text-decoration: none;
`;

const Pagination = ({ page, totalPage, name }) => {
	if (totalPage <= 1) {
		return null;
	}

	if (page < totalPage && page === 1) {
		return (
			<Wrapper>
				<WrapperLink to={`/${name}?page=${page + 1}`}>
					<Button solid title={`Page ${page + 1}`} icon="arrow-right" />
				</WrapperLink>
			</Wrapper>
		);
	} else if (page < totalPage) {
		return (
			<Wrapper type="both">
				<WrapperLink to={`/${name}?page=${page - 1}`}>
					<Button solid left title={`Page ${page - 1}`} icon="arrow-left" />
				</WrapperLink>
				<WrapperLink to={`/${name}?page=${page + 1}`}>
					<Button solid title={`Page ${page + 1}`} icon="arrow-right" />
				</WrapperLink>
			</Wrapper>
		);
	} else {
		return (
			<Wrapper type="one">
				<WrapperLink to={`/${name}?page=${page - 1}`}>
					<Button solid left title={`Page ${page - 1}`} icon="arrow-left" />
				</WrapperLink>
			</Wrapper>
		);
	}
};

export default Pagination;
