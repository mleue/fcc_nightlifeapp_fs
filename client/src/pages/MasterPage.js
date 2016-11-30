import React from 'react';
import DocumentTitle from 'react-document-title';

import Header from './Header';

export default class MasterPage extends React.Component {
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
