import styles from "./current-weather.less";

const CurrentWeather = ({ data }) => {
	return (
		<div className={styles.weather}>
			<div className={styles.weather__top}>
				<div className={styles.weather__wrapper}>
					<div className={styles.weather__city}>{data.city}</div>
					<div className={styles.weather__description}>
						{data.weather[0].description}
					</div>
				</div>
				<div className={styles.weather__icons}>
					<img
						alt="weather"
						className={styles.weather__icon}
						src={`icons/${data.weather[0].icon}.png`}
					/>
				</div>
			</div>
			<div className={styles.weather__bottom}>
				<div className={styles.weather__temperature}>{Math.round(data.main.temp)}°C</div>
				<div className={styles.weather__details}>
					<div className={styles.parameter__row}>
						<span className={styles.parameter__label}>Details</span>
					</div>
					<div className={styles.parameter__row}>
						<span className={styles.parameter__label}>
							Feels like
						</span>
						<span className={styles.parameter__value}>{Math.round(data.main.feels_like)}°C</span>
					</div>
					<div className={styles.parameter__row}>
						<span className={styles.parameter__label}>Wind</span>
						<span className={styles.parameter__value}>{data.wind.speed} m/s</span>
					</div>
					<div className={styles.parameter__row}>
						<span className={styles.parameter__label}>
							Humidity
						</span>
						<span className={styles.parameter__value}>{data.main.humidity}%</span>
					</div>
					<div className={styles.parameter__row}>
						<span className={styles.parameter__label}>
							Pressure
						</span>
						<span className={styles.parameter__value}>{data.main.pressure} hPa</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CurrentWeather;
