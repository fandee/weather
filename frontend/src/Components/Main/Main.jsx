import './Main.css';
import { NewsFeed } from './NewsFeed/NewsFeed';
import { WeatherConditions } from './WeatherConditions/WeatherConditions';
import { ClimateCharts } from './ClimateCharts/ClimateCharts';

const Main = () => {
    return (
        <>
            
            <WeatherConditions/>
            <ClimateCharts/>
        </>
    );
};

export default Main;