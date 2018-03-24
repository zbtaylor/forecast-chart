import React from 'react';

const ConditionControl = ({initialValue, condition, onConditionChange}) => {
	return (
		<div className="condition-control">
			<label htmlFor={condition}>{condition}</label>
			<input type="range"
				min="0"
				max="100"
				defaultValue={initialValue}
				step="10"
				list={condition + 'Percent'}
				name={condition}
				onChange={event => onConditionChange(event.target.name, event.target.value)} />
			<output id={condition}>{initialValue}%</output>
			<datalist id={condition + 'Percent'}>
				<option>0</option>
				<option>10</option>
				<option>20</option>
				<option>30</option>
				<option>40</option>
				<option>50</option>
				<option>60</option>
				<option>70</option>
				<option>80</option>
				<option>90</option>
				<option>100</option>
			</datalist>
		</div>
	)
}

export default ConditionControl;