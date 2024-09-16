import styles from "./forecast.less";
import {
	Accordion,
	AccordionItem,
	AccordionItemButton,
	AccordionItemHeading,
	AccordionItemPanel,
} from "react-accessible-accordion";

const WEEK_DAYS = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];

const Forecast = ({ data }) => {
	const dayInWeek = new Date().getDay();
	const forecastDays = WEEK_DAYS.slice(dayInWeek, WEEK_DAYS.length).concat(
		WEEK_DAYS.slice(0, dayInWeek)
	);

	return (
		<div className={styles.forecast}>
			<div className={styles.forecast__title}>Daily</div>
			<Accordion allowZeroExpanded>
				{data.list.splice(0, 7).map((item, idx) => (
					<AccordionItem key={idx}>
						<AccordionItemHeading>
							<AccordionItemButton>
								<div className={styles.forecast__item}>
									<div className={styles.forecast__container}>
										<img
											alt="weather"
											className={styles.forecast__icon}
											src={`icons/${item.weather[0].icon}.png`}
										/>
									</div>
									<label className={styles.forecast__day}>
										{forecastDays[idx]}
									</label>
									<label
										className={styles.forecast__description}
									>
										{item.weather[0].description}
									</label>
									<lable className={styles.forecast__minmax}>
										{Math.round(item.main.temp_min)}°C /{" "}
										{Math.round(item.main.temp_min)}°C
									</lable>
								</div>
							</AccordionItemButton>
						</AccordionItemHeading>
						<AccordionItemPanel>
							<div className={styles.details}>
								<div className={styles.details__item}>
									<label>Pressure:</label>
									<label>{item.main.pressure}</label>
								</div>
								<div className={styles.details__item}>
									<label>Humidity:</label>
									<label>{item.main.humidity}</label>
								</div>
								<div className={styles.details__item}>
									<label>Clouds:</label>
									<label>{item.clouds.all}%</label>
								</div>
								<div className={styles.details__item}>
									<label>Wind speed:</label>
									<label>{item.wind.speed} m/s</label>
								</div>
								<div className={styles.details__item}>
									<label>Sea level:</label>
									<label>{item.main.sea_level}m</label>
								</div>
								<div className={styles.details__item}>
									<label>Feels like:</label>
									<label>{item.main.feels_like}°C</label>
								</div>
							</div>
						</AccordionItemPanel>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
};

export default Forecast;
