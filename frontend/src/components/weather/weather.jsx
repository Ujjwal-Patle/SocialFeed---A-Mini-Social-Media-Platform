import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  InputGroup,
  Alert,
  Spinner,
} from "react-bootstrap";
import {
  WiDaySunny,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
  WiCloudy,
  WiDayCloudy,
} from "react-icons/wi";
import { FaSearch, FaMapMarkerAlt, FaTimes, FaCloudSun } from "react-icons/fa";
import "./weather.css";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const defaultCity = "Mumbai"; 

const getWeatherIcon = (weatherCode) => {
  const code = weatherCode.toString().charAt(0);
  let icon;
  let condition;

  switch (code) {
    case "2":
      icon = <WiThunderstorm />;
      condition = "thunderstorm";
      break;
    case "3":
      icon = <WiRain />;
      condition = "rain";
      break;
    case "5":
      icon = <WiRain />;
      condition = "rain";
      break;
    case "6":
      icon = <WiSnow />;
      condition = "snow";
      break;
    case "7":
      icon = <WiFog />;
      condition = "fog";
      break;
    case "8":
      if (weatherCode === "800") {
        icon = <WiDaySunny />;
        condition = "clear";
      } else {
        icon = <WiCloudy />;
        condition = "clouds";
      }
      break;
    default:
      icon = <WiDayCloudy />;
      condition = "clouds";
  }

  return { icon, condition };
};

export default function WeatherApp() {
  const [cityInput, setCityInput] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1000;
      setIsMobile(mobile);
      setIsOpen(!mobile);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchWeatherByCity = async (city) => {
    setLoading(true);
    setError("");
    setWeather(null);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city.trim()
        )}&appid=${apiKey}&units=metric&lang=en`
      );
      const data = await res.json();
      if (res.ok) {
        setWeather(data);
        setError("");
      } else {
        setError(data.message || "City not found");
      }
    } catch (e) {
      setError("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError("");
    setWeather(null);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=en`
      );
      const data = await res.json();
      if (res.ok) {
        setWeather(data);
        setError("");
      } else {
        setError(data.message || "Weather not found for your location.");
      }
    } catch (e) {
      setError("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
        },
        (err) => {
          // If permission denied or error, fallback to default city
          setError(
            "Geolocation permission denied or unavailable. Showing weather for default city."
          );
          fetchWeatherByCity(defaultCity);
        },
        { timeout: 10000 } // optional timeout for geolocation
      );
    } else {
      setError(
        "Geolocation is not supported by this browser. Showing weather for default city."
      );
      fetchWeatherByCity(defaultCity);
    }
  }, []);

  const handleSearch = () => {
    if (cityInput.trim() !== "") {
      fetchWeatherByCity(cityInput);
    }
  };

  const toggleWeather = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="weather-toggle"
        onClick={toggleWeather}
        aria-label={isOpen ? "Close weather" : "Open weather"}
      >
        {isOpen ? <FaTimes size={24} /> : <FaCloudSun size={24} />}
      </button>
      <div className={`weather-app ${isOpen ? "open" : "closed"}`}>
        <Container className="weather-container">
          <h2 className="weather-title">
            <WiDayCloudy
              style={{
                fontSize: "1.7em",
                color: "#1a73e8",
                marginRight: "0.3em",
              }}
            />{" "}
            Weather
          </h2>

          <div className="search-container">
            <InputGroup className="weather-input-group">
              <Form.Control
                className="search-input"
                type="text"
                placeholder="Search city..."
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />
              <Button
                variant="primary"
                className="search-button"
                onClick={handleSearch}
              >
                <FaSearch style={{ marginRight: 6 }} />
                Search
              </Button>
            </InputGroup>
          </div>

          {loading && (
            <div className="loading-container">
              <Spinner animation="border" className="loading-spinner" />
              <div>Loading weather...</div>
            </div>
          )}

          {error && (
            <Alert variant="danger" className="error-alert">
              {error}
            </Alert>
          )}

          {weather && (
            <div className="weather-card">
              <h3 className="city-name">
                <FaMapMarkerAlt /> {weather.name}
              </h3>
              <div
                className="weather-icon"
                data-condition={getWeatherIcon(weather.weather[0].id).condition}
              >
                {getWeatherIcon(weather.weather[0].id).icon}
              </div>
              <div className="temperature">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather-description">
                {weather.weather[0].description}
              </div>
              <div className="weather-details">
                <div className="weather-detail">
                  <div className="detail-label">Feels Like</div>
                  <div className="detail-value">
                    {Math.round(weather.main.feels_like)}°C
                  </div>
                </div>
                <div className="weather-detail">
                  <div className="detail-label">Humidity</div>
                  <div className="detail-value">{weather.main.humidity}%</div>
                </div>
                <div className="weather-detail">
                  <div className="detail-label">Wind</div>
                  <div className="detail-value">{weather.wind.speed} m/s</div>
                </div>
                <div className="weather-detail">
                  <div className="detail-label">Pressure</div>
                  <div className="detail-value">
                    {weather.main.pressure} hPa
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      </div>
    </>
  );
}
