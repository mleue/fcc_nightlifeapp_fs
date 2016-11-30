import React from 'react';
import axios from 'axios';
import ListItem from './ListItem';
import LocationSearchBar from './LocationSearchBar';
import { browserHistory } from 'react-router';

export default class IndexPage extends React.Component {
	static contextTypes = {
		authenticated: React.PropTypes.bool,
		user: React.PropTypes.object
	};
	componentWillMount() {
		this.state = { businesses: [] };
	}
	handleOnClick() {
		let loc = document.getElementById('location').value;
		if (loc !== '') {
			this.fetch(loc);
		}
	}
	toggleGoing(venueID, people) {
		if (this.context.authenticated) {
			return toggleChange.bind(this);
		} else {
			return redirectToLogin.bind(this);
		}

		function redirectToLogin() {
			browserHistory.push('/login');
		}
		function toggleChange() {
			let ind = people.indexOf(this.context.user.email);
			let apiEndpoint = '';
			if (ind === -1) {
				people.push(this.context.user.email);
				this.setState({businesses: this.state.businesses});
				apiEndpoint = 'add';
			} else  {
				people.splice(ind, 1);
				this.setState({businesses: this.state.businesses});
				apiEndpoint = 'remove';
			}

			axios.post('/api/'+apiEndpoint, {
				venueID: venueID,
				person: this.context.user.email
			})
				.then( (response) => {
				})
				.catch( (error) => {
					console.log(error);
				});
		}
	}
	fetch(location) {
		axios.get('/api/who?location='+location)
			.then( (response) => {
				this.setState({businesses: response.data});
			})
			.catch( (error) => {
				console.log(error);
			});
	}
	render() {
		return (
			<div className="row">
				<div className="col-xs-8 col-xs-offset-2">
					<LocationSearchBar onClick={this.handleOnClick.bind(this)} />
					<ul className="list-group">
						{ this.state.businesses.map( (business) => {
							return <ListItem key={business.id} name={business.name} img={business.image_url} people={business.people} toggle={this.toggleGoing(business.id, business.people).bind(this)} />
						})}
					</ul>
				</div>
			</div>
		);
	}
}
