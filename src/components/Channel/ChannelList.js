import React from 'react';
import { Row } from 'react-bootstrap';
import ProgramList from '../Program/ProgramList';

const channelList = props => {
	const items = props.channelsData.channels.map((data, index) => (
		<ProgramList key={index} channel={data} />
	));

	return (
		<React.Fragment>
			<h1>Műsorok</h1>
			<Row>
				{ items }
			</Row>
		</React.Fragment>
	)
}

export default channelList;
