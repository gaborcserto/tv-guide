import React from 'react';
import moment from 'moment';
import ProgramProgress from './ProgramProgress';

const programList = ({programData}) => {
	const end = moment(programData.end_datetime)
	const current = moment().format('YYYY-MM-DDTHH:mm:ssZ');

	const getStyle = () => {
		if (end.diff(current) < 0) {
			return ' past';
		} else if (programData.is_live) {
			return ' live';
		} else {
			return '';
		}
	}
	//console.log(programData);

	return (
		<div className={`program${getStyle()}`}>
			<h4>{programData.title}</h4>
			<p>{programData.start_time}</p>
			<p>{programData.short_description}</p>
			{ getStyle() === ' live' ? <ProgramProgress start={programData.start_datetime} end={programData.end_datetime}/> : null }
		</div>
	)
}

export default programList;