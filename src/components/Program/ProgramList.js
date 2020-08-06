import React from 'react';
import { Col } from 'react-bootstrap';
import Program from './Program';

const programList = ({channel}) => {
	const items = channel.programs.map((data, index) => (
		<Program key={index} programData={data} />
	));

	return (
		<Col>
			<div>
				<h2>{channel.name}</h2>
				{ items }
			</div>
		</Col>
	)
}

export default programList;