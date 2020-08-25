import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../images/logo.png';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/user/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavBackground = styled.div`
	width: 100%;
	background-color: var(--color-primary);
`;

const NavContainer = styled.nav`
	width: 80%;
	min-height: 6rem;
	margin: 0 auto;
	display: flex;
	align-items: center;
`;

const BrandLogoWrapper = styled(Link)`
	display: flex;
	align-items: center;
	flex: 0;
	font-size: 1.8rem;
	text-decoration: none;
	color: var(--color-text);
`;

const BrandLogoName = styled.div`
	margin-left: 1rem;
`;

const BrandLogo = styled.img`
	height: 4rem;
	width: auto;
`;

const MainNavWrapper = styled.div`
	flex: 1;
	display: flex;
	justify-content: center;
`;

const MainNav = styled.ul`
	width: 80%;
	list-style: none;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const StyledLink = styled(Link)`
	text-decoration: none;
	color: var(--color-text);
	border: 1px solid black;
	border-radius: 0.5rem;
	padding: 0.5rem 1rem;
	&:hover {
		opacity: 0.8;
		background-color: var(--color-lighter);
	}
`;

const FormWrapper = styled.div`
	flex: 3;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Form = styled.form`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: var(--color-lighter);
	border-radius: 0.8rem;
	height: 2.8rem;
	width: 60%;
	padding: 0 2rem;
`;

const SearchButton = styled.button`
	line-height: 1;
	cursor: pointer;
	background-color: transparent;
	border: none;
	outline: none;
	color: rgba(0, 0, 0, 0.7);
	@media ${(props) => props.theme.mediaQueries.large} {
		color: var(--text-color);
		font-size: 10px;
	}

	@media ${(props) => props.theme.mediaQueries.small} {
		color: var(--text-color);
		font-size: 8px;
	}
`;

const Input = styled.input`
	font-size: 1.4rem;
	line-height: 1;
	font-weight: 300;
	background-color: transparent;
	width: 100%;
	margin-left: 1rem;
	color: rgba(0, 0, 0, 0.7);
	border: none;

	&:focus,
	&:active {
		outline: none;
	}

	&::placeholder {
		color: rgba(0, 0, 0, 0.7);
	}
`;

const LogoutButton = styled.button`
	color: var(--color-primary);
	padding: 0.5rem 0.5rem;
	font-size: 1.4rem;
	border-radius: 1rem;

	&:hover {
		background-color: #e04c4c;
		opacity: 0.8;
	}
`;

const User = styled.h3`
	font-size: 1.6rem;
	line-height: 1.4rem;
	margin: 0 0.3rem;
`;

const Nav = () => {
	let history = useHistory();
	const [query, setQuery] = useState('');
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (query.length === 0) {
			return;
		}
		setQuery('');
		history.push(`/search/all?q=${query}`);
	};

	const handleLogout = (e) => {
		dispatch(logout());
	};

	return (
		<NavBackground>
			<NavContainer>
				<BrandLogoWrapper to="/">
					<BrandLogo src={logo} />
					<BrandLogoName>Soundable</BrandLogoName>
				</BrandLogoWrapper>
				<FormWrapper>
					<Form onSubmit={handleSubmit}>
						<SearchButton type="submit">
							<FontAwesomeIcon icon="search" />
						</SearchButton>
						<Input
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Search something"
						/>
					</Form>
				</FormWrapper>
				<MainNavWrapper>
					<MainNav>
						{user.currentUser ? (
							<>
								<User>{user.currentUser}</User>
								<LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
							</>
						) : (
							<>
								<li>
									<StyledLink to="/signup">Sign up</StyledLink>
								</li>
								<li>
									<StyledLink to="/login">Login</StyledLink>
								</li>
							</>
						)}
					</MainNav>
				</MainNavWrapper>
			</NavContainer>
		</NavBackground>
	);
};

export default Nav;
