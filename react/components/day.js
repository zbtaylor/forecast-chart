import React from 'react';

const Day = ({day, high, low, rain, sleet, snow, ice}) => {
	if (day.name === "Today" && day.hourly.length < 24) {
		const diff = 24 - day.hourly.length;
		for (let i = 0; i < diff; i++) {
			day.hourly.unshift({empty: true});
		}
	} else if (day.hourly.length < 24) {
		const diff = 24 - day.hourly.length;
		for (let i = 0; i < diff; i++) {
			day.hourly.push({empty: true});
		}
	}

	const hours = day.hourly.map(hour => {
		if (hour.temperature > high || hour.temperature < low) {
			return <span className="time-block unrideable"><div><img className="icon" src={"./images/icons/" + hour.icon + ".svg"} /><p>{Math.floor(hour.temperature)}&#176;</p></div></span>;
		} else if (hour.precipType === "rain" && hour.precipProbability * 100 > rain) {
			return <span className="time-block unrideable"><div><img className="icon" src={"./images/icons/" + hour.icon + ".svg"} /><p>{Math.floor(hour.temperature)}&#176;</p></div></span>;
		} else if (hour.precipType === "sleet" && hour.precipProbability * 100 > sleet) {
			return <span className="time-block unrideable"><div><img className="icon" src={"./images/icons/" + hour.icon + ".svg"} /><p>{Math.floor(hour.temperature)}&#176;</p></div></span>;
		} else if (hour.precipType === "snow" && hour.precipProbability * 100 > snow) {
			return <span className="time-block unrideable"><div><img className="icon" src={"./images/icons/" + hour.icon + ".svg"} /><p>{Math.floor(hour.temperature)}&#176;</p></div></span>;
		} else if (hour.precipType === "ice" && hour.precipProbability * 100 > ice) {
			return <span className="time-block unrideable"><div><img className="icon" src={"./images/icons/" + hour.icon + ".svg"} /><p>{Math.floor(hour.temperature)}&#176;</p></div></span>;
		} else if (hour.empty === true) {
			return <span className="time-block empty"></span>;
		} else {
			return <span className="time-block rideable"><div><img className="icon" src={"./images/icons/" + hour.icon + ".svg"} /><p>{Math.floor(hour.temperature)}&#176;</p></div></span>;
		}
	});

	return (
		<div className="day">
			<div className="day-name">
				{day.name}
			</div>
			<div className="hours">
				{hours}
			</div>
		</div>
	)
}

export default Day;