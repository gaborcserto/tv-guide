import React from 'react';
import { Col, Row } from 'react-bootstrap';
import moment from 'moment';
import ProgramProgress from './ProgramProgress';

const programList = ({programData, pastPrograms}) => {
	const end = moment(programData.end_datetime)
	const current = moment().format('YYYY-MM-DDTHH:mm:ssZ');

	const getStyle = () => {
		if (end.diff(current) < 0) {
			return ` past${pastPrograms ? ' show' : ''}`;
		} else if (programData.is_live) {
			return ' live';
		} else {
			return '';
		}
	}
	//console.log(programData);

	return (
		<div className={`program${getStyle()}`}>
			<Row>
				<Col xs={3}>
					<p className="program__time">{programData.start_time}</p>
				</Col>
				<Col xs={9}>
					<h4 className="program__title">{programData.title}</h4>
					<p className="program__description">{programData.short_description}</p>
				</Col>
			</Row>
			<div className="clearfix" />
			{ getStyle() === ' live' ? <ProgramProgress start={programData.start_datetime} end={programData.end_datetime}/> : null }
		</div>
	)
}

export default programList;