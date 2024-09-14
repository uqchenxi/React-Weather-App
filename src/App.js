import styles from './App.less';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';

function App() {
  const handleOnSearchChange = (searchData) => {
    console.log(123)
  }

  return (
    <div className={styles.container}>
      <Search onSearchChange={handleOnSearchChange}/>
      <CurrentWeather />
    </div>
  );
}

export default App;
