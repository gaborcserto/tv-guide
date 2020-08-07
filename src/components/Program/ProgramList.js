import React from 'react';
import { Col } from 'react-bootstrap';
import Program from './Program';

const programList = ({channel}) => {
	const items = channel.programs.map((data, index) => (
		<Program key={index} programData={data} />
	));

	return (
		<Col sd={6} md={4} >
			<div className="programList">
				<h2 className="programList__title">{channel.name}</h2>
				{ items }
			</div>
		</Col>
	)
}

export default programList;