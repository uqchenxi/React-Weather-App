import styles from "./App.less";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api/open-weather-api";
import { useState } from "react";

function App() {
	const [currentWeather, setCurrentWeather] = useState(null);
	const [forecastWeather, setForecasetWeather] = useState(null);

	const handleOnSearchChange = (searchData) => {
		const [lat, lon] = searchData.value.split(" ");

		const currentWeatherFetch = fetch(
			`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
		);
		const forecastFetch = fetch(
			`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
		);

		Promise.all([currentWeatherFetch, forecastFetch])
			.then((responses) =>
				Promise.all(responses.map((response) => response.json()))
			)
			.then(([weatherResponse, forecastResponse]) => {
				setCurrentWeather({
					city: searchData.label,
					...weatherResponse,
				});
				setForecasetWeather({
					city: searchData.label,
					...forecastResponse,
				});
			})
			.catch((error) => {
				console.error("Error fetching data", error);
			});
	};

	console.log(currentWeather);
	console.log(forecastWeather);

	return (
		<div className={styles.container}>
			<Search onSearchChange={handleOnSearchChange} />
			{currentWeather && <CurrentWeather data={currentWeather} />}
		</div>
	);
}

export default App;
