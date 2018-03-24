import React from 'react';
import ReactDOM from 'react-dom';

import Controls from './components/controls';
import ForecastChart from './components/forecast-chart';
import SearchBar from './components/search-bar';

class App extends React.Component {
	constructor(props) {
		super(props);

		let emptyDay = [];

		for (let i = 0; i < 24; i++) {
			emptyDay.push({empty: true});
		}

		const placeholderDays = [
			{hourly: emptyDay, name: "Today"},
			{hourly: emptyDay, name: "Mon"},
			{hourly: emptyDay, name: "Tue"},
			{hourly: emptyDay, name: "Wed"},
			{hourly: emptyDay, name: "Thu"},
			{hourly: emptyDay, name: "Fri"},
			{hourly: emptyDay, name: "Sat"},
			{hourly: emptyDay, name: "Sun"}
		]

		let address, lat, lng, high, low, rain, sleet, snow, ice;

		if (this.storageAvailable('localStorage')) {
			let storage = window.localStorage;
			address = storage.address;
			lat = storage.lat;
			lng = storage.lng;
			high = storage.high;
			low = storage.low;
			rain = storage.rain;
			sleet = storage.sleet;
			snow = storage.snow;
			ice = storage.ice;
		}

		this.state = {
			address: address || undefined,
			lat: lat || undefined,
			lng: lng || undefined,
			high: high || 85,
			low: low || 40,
			rain: rain || 0,
			sleet: sleet || 0,
			snow: snow || 0,
			ice: ice || 0,
			days: placeholderDays
		};
	}

	render() {
		return (
			<div>
				<div className="one-third">
					<SearchBar
						address={this.state.address}
						onLocationSearch={address => this.getForecast(address)} />
					<Controls
						high={this.state.high}
						low={this.state.low}
						daily={this.state.daily}
						rain={this.state.rain}
						sleet={this.state.sleet}
						snow={this.state.snow}
						ice={this.state.ice}
						onTempChange={(temp, value) => this.updateTemp(temp, value)}
						onConditionChange={(condition, value) => this.updateCondition(condition, value)} />
				</div>
				<div className="two-thirds">
					<ForecastChart
						days={this.state.days}
						high={this.state.high}
						low={this.state.low}
						rain={this.state.rain}
						sleet={this.state.sleet}
						snow={this.state.snow}
						ice={this.state.ice} />
				</div>
			</div>
		)
	}

	componentDidMount() {
		if (this.state.lat && this.state.lng) {
			this.getForecast({lat: this.state.lat, lng: this.state.lng});
		} else {
			navigator.geolocation.getCurrentPosition(pos => {
				this.getForecast({lat: pos.coords.latitude, lng: pos.coords.longitude});
				let address = this.reverseGeocode(pos.coords.latitude, pos.coords.longitude);
				address
					.then(res => {
						this.setState({address: res.formatted_address})
					})
					.catch(error => {
						console.log(error)
					});
			});
		}
	}

	geocode(address) {
		return new Promise(resolve => {
			const geocoder = new window.google.maps.Geocoder();
			geocoder.geocode({address: address}, (res, status) => {
				if (status = google.maps.GeocoderStatus.OK) {
					resolve(res[0]);
				}
			});
		});
	}

	reverseGeocode(lat, lng) {
		return new Promise(resolve => {
			const geocoder = new window.google.maps.Geocoder();
			geocoder.geocode({location: {lat: lat, lng: lng}}, (res, status) => {
				if (status = google.maps.GeocoderStatus.OK) {
					resolve(res[0]);
				}
			});
		});
	}

	getForecast(location) {
		if (location.lat && location.lng) {
			this.requestForecast(location);
			this.saveSetting("lat", location.lat);
			this.saveSetting("lng", location.lng);
		} else {
			let geocodedAddress = this.geocode(location);
			geocodedAddress
				.then(res => {
					const coords = {
						lat: res.geometry.location.lat(),
						lng: res.geometry.location.lng()
					};
					this.requestForecast(coords);
					this.setState({address: res.formatted_address});
					this.saveSetting("address", res.formatted_address);
					this.saveSetting("lat", coords.lat);
					this.saveSetting("lng", coords.lng);
				})
				.catch(error => {
					console.log(error)
				});
		}
	}

	requestForecast(coords) {
		const url = '/forecast/' + coords.lat + ',' + coords.lng;
		const xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.onload = () => {
			if (xhr.status === 200) {
				this.setState({days: JSON.parse(xhr.response).daily});
			} else {
				console.log('Request failed. HTTP status: ' + xhr.status);
			}
		};
		xhr.send();
	}

	updateTemp(temp, value) {
		this.setState({[temp]: Number(value)});
		this.saveSetting(temp, Number(value));
	}

	updateCondition(condition, value) {
		const output = document.getElementById(condition);
		output.value = value + '%';
		this.setState({[condition]: Number(value)});
		this.saveSetting(condition, Number(value));
	}

	storageAvailable(type) {
		try {
			var storage = window[type],
				x = '__storage_test__';
			storage.setItem(x, x);
			storage.removeItem(x);
			return true;
		}
		catch(e) {
			return e instanceof DOMException && (
				e.code === 22 ||
				e.code === 1014 ||
				e.name === 'QuotaExceededError' ||
				e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
				storage.length !== 0;
		}
	}

	saveSetting(setting, value) {
		if (this.storageAvailable('localStorage')) {
			window.localStorage.setItem(setting, value);
		}
	}
}

ReactDOM.render(<App />, document.querySelector('#app'));