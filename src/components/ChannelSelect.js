import React, { useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Button } from 'react-bootstrap';
const ChannelSelect = props => {
	const [ selectValue, setSelectValue ] = useState(props.default);

	const handleSelectFormSubmit = e => {
		e.preventDefault();
		props.select(selectValue);
		//console.log(selectValue);
		//console.log(e);
	}

	const handleSelectChanges = options => {
		setSelectValue(options);
		props.select(options);
		//console.log(options);
		//props.channels.slice(0, 3)
		//console.log(selectValue);
	}



return (
		<form className="container" onSubmit={handleSelectFormSubmit}>
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
				//selected={setSelectValue}
			/>
			<Button
				type="submit"
				className="button"
				variant="default">
				Keres
			</Button>
		</form>
	)
}

export default ChannelSelect;