import React from 'react';
import ConditionControl from './condition-control';
import TempControl from './temp-control';

const Controls = ({high, low, rain, sleet, snow, ice, onTempChange, onConditionChange}) => {
	return (
		<div className="controls widget">
			<ConditionControl condition="rain" initialValue={rain} onConditionChange={onConditionChange} />
			<ConditionControl condition="sleet" initialValue={sleet} onConditionChange={onConditionChange} />
			<ConditionControl condition="snow" initialValue={snow} onConditionChange={onConditionChange} />
			<ConditionControl condition="ice" initialValue={ice} onConditionChange={onConditionChange} />
			<TempControl name="high" initialTemp={high} onTempChange={onTempChange} />
			<TempControl name="low" initialTemp={low} onTempChange={onTempChange} />
		</div>
	)
}

export default Controls;