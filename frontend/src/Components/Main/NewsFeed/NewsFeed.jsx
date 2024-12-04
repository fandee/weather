import React, { useState, useEffect } from 'react';
import './NewsFeed.css';
import { getWeatherData } from '../../../api/weather/weather';

export const NewsFeed = () => {
    const [news, setNews] = useState([]);
    const [weather, setWeather] = useState(null); // Початковий стан null

    // Імітація отримання даних про новини
    useEffect(() => {
        const fetchedNews = [
            { id: 1, title: 'Підвищення температури на 2°C у жовтні', date: '2024-11-15', description: 'У Львівській області зафіксовано незвичне підвищення температури цього місяця.' },
            { id: 2, title: 'Високий рівень опадів у листопаді', date: '2024-11-14', description: 'Метеорологи прогнозують рясні дощі протягом найближчого тижня.' },
            { id: 3, title: 'Нові методи моніторингу клімату', date: '2024-11-10', description: 'Впроваджено нові технології для покращення якості даних про клімат.' },
        ];
        setNews(fetchedNews);

        // Отримання даних про погоду
        const fetchWeatherData = async () => {
            try {
                const weatherData = await getWeatherData(); // Очікуємо Promise
                setWeather(weatherData); // Зберігаємо дані у стан
            } catch (error) {
                console.error('Помилка при отриманні даних про погоду:', error);
            }
        };

        fetchWeatherData();
    }, []);

    return (
        <div className="news-feed-container">
            <h1 className="news-title">Кліматичні новини Львівської області</h1>
            {/* Відображення погоди тільки після успішного завантаження */}
            <h2>{weather ? `Поточна погода: ${weather}` : 'Завантаження даних про погоду...'}</h2>
            <ul className="news-list">
                {news.map(item => (
                    <li key={item.id} className="news-item">
                        <h2 className="news-item-title">{item.title}</h2>
                        <p className="news-item-date">{item.date}</p>
                        <p className="news-item-description">{item.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
