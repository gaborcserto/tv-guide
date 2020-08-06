import React from 'react';
import { ProgressBar } from 'react-bootstrap'
import moment from 'moment';

const programProgress = props => {
	const start = moment(props.start);
	const end = moment(props.end);
	const current = moment().format('YYYY-MM-DDTHH:mm:ssZ');

	const max = end.diff(start);
	const now = end.diff(current);

	const getProgress = () => {
		return ((1 - (now / max)) * 100).toFixed(3);
	}

	return (
		<ProgressBar animated now={getProgress()} />
	)
}

export default programProgress;