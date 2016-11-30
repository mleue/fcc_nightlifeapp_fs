import React from 'react';

export default function LocationSearchBar(props) {
	return (
		<div className="input-group">
			<input type="text" className="form-control" id="location" placeholder="Location..." />
			<span className="input-group-btn">
				<button className="btn btn-default" type="button" onClick={props.onClick}>Search!</button>
			</span>
		</div>
	);
}
