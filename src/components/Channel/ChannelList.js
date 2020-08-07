import React, { useState } from 'react';
import { Row, Button } from 'react-bootstrap';
import ProgramList from '../Program/ProgramList';

const ChannelList = props => {
	const [ pastPrograms, setPastPrograms ] = useState(false);

	const handlePastPrograms = (e) => {
		setPastPrograms(!pastPrograms);
	}

	const items = props.channelsData.channels.map((data, index) => (
		<ProgramList key={index} channel={data} pastPrograms={pastPrograms}/>
	));

	return (
		<React.Fragment>
			<h1>Műsorok</h1>
			<div>
				<Button variant="link" onClick={handlePastPrograms}>
					Korábbi műsorok {pastPrograms ? 'elrejtése' : 'mutatása'}
				</Button>
			</div>
			<Row>
				{ items }
			</Row>
		</React.Fragment>
	)
}

export default ChannelList;
