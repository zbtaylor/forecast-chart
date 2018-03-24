import React from 'react';

const TempControl = ({name, initialTemp, onTempChange}) => {

	return (
		<div className="temp-control">
			<label htmlFor={name}>{name}</label>
			<input type="number" name={name} defaultValue={initialTemp}
				onChange={event => onTempChange(event.target.name, event.target.value)} />
		</div>
	)
}

export default TempControl;