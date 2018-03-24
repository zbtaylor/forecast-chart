# Forecast Chart

I like to cycle and wanted to be able to quickly see how much of the week ahead was going to be nice enough to ride outside. The app pulls hourly weather data from the [Dark Sky API](https://darksky.net/dev) and maps it to an interactive chart.

Depending on the settings you've selected, each hour is rendered as either "nice enough" (green), "not nice enough" (dark grey), or "in the past/unavailable" (light grey). Settings and location are saved to localStorage, if it's available.

See it in action here: [forecast.ztaylor.io](https://forecast.ztaylor.io). The first run can be a bit slow, between the Heroku hobby dyno spinning up and the browser geolocation API taking it's time finding your location.