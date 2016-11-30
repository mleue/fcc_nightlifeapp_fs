import React from 'react';
import axios from 'axios';
import ListItem from './ListItem';
import LocationSearchBar from './LocationSearchBar';

export default class IndexPage extends React.Component {
	componentWillMount() {
		this.state = { businesses: [] };
	}
	handleOnClick() {
		let loc = document.getElementById('location').value;
		if (loc !== '') {
			this.fetch(loc);
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
							return <ListItem key={business.id} name={business.name} img={business.image_url} people={business.people} />
						})}
					</ul>
				</div>
			</div>
		);
	}
}
