import React from 'react';
import axios from 'axios';
import ListItem from './ListItem';

export default class IndexPage extends React.Component {
	componentWillMount() {
		this.state = { businesses: [] };
		this.fetch();
	}
	fetch() {
		axios.get('/api/who')
			.then( (response) => {
				this.setState({businesses: response.data});
			})
			.catch( (error) => {
				console.log(error);
			});
	}
	render() {
		return (
			<div className="container">
				<ul className="lead">
					{ this.state.businesses.map( (business) => {
						return <ListItem key={business.id} name={business.name} img={business.image_url} people={business.people} />
					})}
				</ul>
			</div>
		);
	}
}
