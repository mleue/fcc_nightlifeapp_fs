import React from 'react';
import DocumentTitle from 'react-document-title';
import Header from './Header';

export default class MasterPage extends React.Component {
	static childContextTypes = {
		appState: React.PropTypes.func
	};
	componentWillMount() {
		this.state = { latestLocation: '' };
	}
	appState(obj) {
		if (typeof obj === "string") {
			return this.state[obj];
		}
		this.setState(obj);
	}
	getChildContext() {
		return {
			appState: this.appState.bind(this)
		};
	}
	render() {
		return (
			<DocumentTitle title='Nightlife App'>
			<div className='MasterPage'>
				<Header />
				{ this.props.children }
			</div>
			</DocumentTitle>
		);
	}
}
