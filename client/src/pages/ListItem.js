import React from 'react';

export default function ListItem(props) {
	return (
		<li className="list-group-item" >
			<span className="badge" style={{cursor: 'pointer'}}>{props.people.length} going</span>
			<table>
				<tbody>
					<tr>
						<td style={{width: '200px'}}>
							<img className="img-responsive" style={{height: '100px'}} src={props.img} alt={props.name} />
						</td>
						<td>
							{props.name}
						</td>
					</tr>
				</tbody>
			</table>
		</li>
	)
}
