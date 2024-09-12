import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api/geodb";

const Search = ({ onSearchChange }) => {
	const [search, setSearch] = useState(null);

	const loadOptions = (inputValue) => {
		return fetch(
			`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
			geoApiOptions
		)
			.then((response) => response.json())
			.then((response) => ({ options: response.data.map((city) => ({
				value: `${city.latitude} ${city.longtitude}`,
				label: `${city.name},  ${city.countryCode}`
			})) }))
			.catch((err) => console.log(err));
	};

	const handlOnChange = (searchData) => {
		setSearch(searchData);
		onSearchChange(searchData);
	};

	return (
		<AsyncPaginate
			placeholder="Search for city"
			debounceTimeout={600}
			value={search}
			onChange={handlOnChange}
			loadOptions={loadOptions}
		/>
	);
};

export default Search;
