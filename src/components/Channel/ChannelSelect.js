import React, { useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';

const ChannelSelect = props => {
	const [ selectValue, setSelectValue ] = useState(props.default);

	const handleSelectChanges = options => {
		setSelectValue(options);
		props.select(options);
	}

	return (
		<Typeahead
			clearButton
			defaultSelected={selectValue}
			id="selections-example"
			labelKey="name"
			multiple
			name="selectValue"
			options={props.channels}
			placeholder="Válasszon..."
			onChange={handleSelectChanges}
		/>
	)
}

export default ChannelSelect;