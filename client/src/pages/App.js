import React from 'react';
import {
	Content,
	Nav,
	Sidebar,
	PrivateRoute,
	PublicRoute,
} from '../components';
import { Router, Switch, Route, useHistory } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faSearch,
	faUser,
	faKey,
	faPlus,
	faTrash,
	faArrowLeft,
	faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { Landing, Search, SearchAll, Login, Signup, Main } from '.';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/actions/user/actions';
import history from '../utils/history';
import PlaylistPage from './PlaylistPage';
import Audio from '../components/Audio';
import AlbumPage from './AlbumPage';
import ArtistPage from './ArtistPage';

library.add(
	faSearch,
	faUser,
	faKey,
	faPlus,
	faTrash,
	faArrowLeft,
	faArrowRight
);

const App = () => {
	let token = localStorage.getItem('token');
	const dispatch = useDispatch();
	if (token) {
		dispatch(setUser(token));
	}
	const audio = useSelector((state) => state.audio);
	return (
		<Router history={history}>
			<>
				<Nav />
				<Content>
					<Switch>
						<PublicRoute path="/" exact component={Landing} restricted />
						<Route path="/search/all" exact component={SearchAll} />
						<Route path="/search/:name" exact component={Search} />
						<PublicRoute path="/login" exact component={Login} restricted />
						<PublicRoute path="/signup" exact component={Signup} restricted />
						<PrivateRoute path="/main/:name" exact component={Main} />
						<PrivateRoute
							path="/playlists/:id"
							exact
							component={PlaylistPage}
						/>
						<PrivateRoute path="/albums/:id" exact component={AlbumPage} />
						<PrivateRoute path="/artists/:id" exact component={ArtistPage} />
					</Switch>
					<Audio playlist={audio.playlist} />
				</Content>
			</>
		</Router>
	);
};

export default App;
