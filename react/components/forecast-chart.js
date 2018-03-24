import React from 'react';
import Day from './day';

const ForecastChart = ({days, high, low, rain, sleet, snow, ice}) => {

	const daysList = days.map(day => 
		<Day
			key={day.name}
			high={high}
			low={low}
			day={day}
			rain={rain}
			sleet={sleet}
			snow={snow}
			ice={ice} />
	);

	return (
		<div className="widget">
			<div className="hourly-labels-container">
				<span className="hourly-label">12am</span>
				<span className="hourly-label">2am</span>
				<span className="hourly-label">4am</span>
				<span className="hourly-label">6am</span>
				<span className="hourly-label">8am</span>
				<span className="hourly-label">10am</span>
				<span className="hourly-label">12pm</span>
				<span className="hourly-label">2pm</span>
				<span className="hourly-label">4pm</span>
				<span className="hourly-label">6pm</span>
				<span className="hourly-label">8pm</span>
				<span className="hourly-label">10pm</span>
			</div>
			<div className="hourly-ticks-container">
				<span className="hourly-tick"></span>
				<span className="hourly-tick"></span>
				<span className="hourly-tick"></span>
				<span className="hourly-tick"></span>
				<span className="hourly-tick"></span>
				<span className="hourly-tick"></span>
				<span className="hourly-tick"></span>
				<span className="hourly-tick"></span>
				<span className="hourly-tick"></span>
				<span className="hourly-tick"></span>
				<span className="hourly-tick"></span>
				<span className="hourly-tick"></span>
				<span className="hourly-tick"></span>
				<span className="hourly-tick"></span>
				<span className="hourly-tick"></span>
				<span className="hourly-tick"></span>
				<span className="hourly-tick"></span>
				<span className="hourly-tick"></span>
				<span className="hourly-tick"></span>
				<span className="hourly-tick"></span>
				<span className="hourly-tick"></span>
				<span className="hourly-tick"></span>
				<span className="hourly-tick"></span>
				<span className="hourly-tick"></span>
			</div>
			{daysList}
		</div>
	)
}

export default ForecastChart;