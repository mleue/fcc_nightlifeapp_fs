import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Route, browserHistory } from 'react-router';
import ReactStormpath, { Router, HomeRoute, LoginRoute, AuthenticatedRoute } from 'react-stormpath';
import MasterPage from './pages/MasterPage'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import ProfilePage from './pages/ProfilePage'

ReactStormpath.init();
ReactDOM.render(
	<Router history={browserHistory}>
		<HomeRoute path='/' component={MasterPage}>
			<IndexRoute component={IndexPage} />
			<LoginRoute path='/login' component={LoginPage} />
			<Route path='/register' component={RegistrationPage} />
			<AuthenticatedRoute>
				<HomeRoute path='/' component={MasterPage} />
			</AuthenticatedRoute>
			<AuthenticatedRoute>
				<Route path='/profile' component={ProfilePage} />
			</AuthenticatedRoute>
		</HomeRoute>
	</Router>,
	document.getElementById('root')
);
