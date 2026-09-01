import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  const [lat, setLat] = useState("12.9716");
  const [lon, setLon] = useState("77.5946");

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `http://localhost:5000/api/weather?lat=${lat}&lon=${lon}`
      );

      setWeather(response.data);
    } catch (err) {
      console.error(err);
      setError("Unable to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        <h1 style={styles.title}>🌦️ Weather Information</h1>

        <p style={styles.subtitle}>
          Get current weather conditions for your farm location.
        </p>

        <div style={styles.formCard}>

          <div style={styles.field}>
            <label>Latitude</label>
            <input
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              placeholder="Example: 12.9716"
            />
          </div>

          <div style={styles.field}>
            <label>Longitude</label>
            <input
              value={lon}
              onChange={(e) => setLon(e.target.value)}
              placeholder="Example: 77.5946"
            />
          </div>

          <button
            onClick={getWeather}
            style={styles.button}
            disabled={loading}
          >
            {loading ? "Loading..." : "Get Weather"}
          </button>

        </div>

        {error && (
          <div style={styles.error}>
            ⚠️ {error}
          </div>
        )}

        {weather && (
          <div style={styles.weatherCard}>

            <div style={styles.location}>
              📍 {weather.name || "Farm Location"}
            </div>

            <div style={styles.mainWeather}>

              <div>
                <div style={styles.temperature}>
                  {Math.round(weather.main.temp)}°C
                </div>

                <div style={styles.condition}>
                  {weather.weather?.[0]?.main}
                </div>
              </div>

              <div style={styles.weatherIcon}>
                {weather.weather?.[0]?.main === "Rain"
                  ? "🌧️"
                  : weather.weather?.[0]?.main === "Clouds"
                  ? "☁️"
                  : weather.weather?.[0]?.main === "Clear"
                  ? "☀️"
                  : "🌤️"}
              </div>

            </div>

            <div style={styles.details}>

              <div style={styles.detailBox}>
                <span>💧</span>
                <p>Humidity</p>
                <strong>{weather.main.humidity}%</strong>
              </div>

              <div style={styles.detailBox}>
                <span>🌡️</span>
                <p>Feels Like</p>
                <strong>
                  {Math.round(weather.main.feels_like)}°C
                </strong>
              </div>

              <div style={styles.detailBox}>
                <span>💨</span>
                <p>Wind Speed</p>
                <strong>{weather.wind.speed} m/s</strong>
              </div>

              <div style={styles.detailBox}>
                <span>🔽</span>
                <p>Pressure</p>
                <strong>{weather.main.pressure} hPa</strong>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f7f2",
    padding: "40px 20px",
  },

  container: {
    maxWidth: "900px",
    margin: "auto",
  },

  title: {
    color: "#234d20",
    marginBottom: "8px",
  },

  subtitle: {
    color: "#687568",
    marginBottom: "30px",
  },

  formCard: {
    background: "#fff",
    padding: "25px",
    borderRadius: "15px",
    display: "flex",
    gap: "15px",
    alignItems: "end",
    flexWrap: "wrap",
    boxShadow: "0 5px 18px rgba(0,0,0,0.07)",
  },

  field: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
  },

  button: {
    background: "#2e7d32",
    color: "#fff",
    border: "none",
    padding: "12px 22px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  weatherCard: {
    background: "#fff",
    marginTop: "25px",
    padding: "30px",
    borderRadius: "18px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
  },

  location: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#234d20",
  },

  mainWeather: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "25px 0",
  },

  temperature: {
    fontSize: "55px",
    fontWeight: "bold",
    color: "#2e7d32",
  },

  condition: {
    color: "#687568",
    fontSize: "18px",
  },

  weatherIcon: {
    fontSize: "70px",
  },

  details: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "15px",
  },

  detailBox: {
    background: "#f4f7f2",
    padding: "18px",
    borderRadius: "12px",
    textAlign: "center",
  },

  error: {
    marginTop: "20px",
    background: "#ffebee",
    color: "#c62828",
    padding: "12px",
    borderRadius: "8px",
  },
};