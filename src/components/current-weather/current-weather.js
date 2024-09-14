import styles from "./current-weather.less";

const CurrentWeather = () => {
	return (
		<div className={styles.weather}>
			<div className={styles.weather__top}>
				<div className={styles.weather__wrapper}>
					<div className={styles.weather__city}>London</div>
					<div className={styles.weather__description}>Sunny</div>
				</div>
				<div className={styles.weather__icons}>
					<img
						alt="weather"
						className={styles.weather__icon}
						src="icons/01d.png"
					/>
				</div>
			</div>
            <div className={styles.weather__bottom}>
                <div className={styles.weather__temperature}>18°C</div>
                <div className={styles.weather__details}>
                    <div className={styles.parameter__row}>
                        <span className={styles.parameter__label}>
                            Details
                        </span>
                    </div>
                    <div className={styles.parameter__row}>
                        <span className={styles.parameter__label}>
                            Feels like
                        </span>
                        <span className={styles.parameter__value}>
                            22 °C
                        </span>
                    </div>
                    <div className={styles.parameter__row}>
                        <span className={styles.parameter__label}>
                            Wind
                        </span>
                        <span className={styles.parameter__value}>
                            2 m/s
                        </span>
                    </div>
                    <div className={styles.parameter__row}>
                        <span className={styles.parameter__label}>
                            Humidity
                        </span>
                        <span className={styles.parameter__value}>
                            15%
                        </span>
                    </div>
                    <div className={styles.parameter__row}>
                        <span className={styles.parameter__label}>
                            Pressure
                        </span>
                        <span className={styles.parameter__value}>
                            15 hPa
                        </span>
                    </div>
                </div>
            </div>
		</div>
	);
};

export default CurrentWeather;
