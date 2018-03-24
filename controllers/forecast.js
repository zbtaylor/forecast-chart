const request = require('request');
const timestamp = require('unix-timestamp');
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DS_KEY = process.env.DS_KEY;

exports.forecast_get = (req, res, next) => {
	const url = 'https://api.darksky.net/forecast/' + DS_KEY + "/" + req.params.coords + '?extend=hourly';
	request(url, (error, response, body) => {
		if (error) {
			// Handle error for real
			console.log(error);
		} else {
			const json = JSON.parse(body);
			const offset = json.offset;
			let hourly = json.hourly.data;
			let daily = [];

			const startTime = timestamp.toDate(json.hourly.data[0].time);
			let startHour;

			if (startTime.getHours() + offset < 0) {
				startHour = startTime.getHours() + offset + 24;
			} else {
				startHour = startTime.getHours() + offset;
			}
			
			const hoursLeft = 24 - startHour;
			let dateNum = startTime.getDay();

			const today = {
				name: 'Today',
				hourly: hourly.splice(0, hoursLeft)
			}

			if (dateNum < 6) {
				dateNum++;
			} else {
				dateNum = 0;
			}

			daily.push(today);

			for (let i = 0; i < 7; i++) {
				const day = {
					name: DAYS[dateNum],
					hourly: hourly.splice(0, 24),
					startHour: startHour
				}

				if (dateNum < 6) {
					dateNum++;
				} else {
					dateNum = 0;
				}

				daily.push(day);
			}

			const forecast = {
				daily: daily,
				raw: json
			}
			
			res.send(forecast);
		}
	});
}