import React, { useEffect, useState } from "react";
import axios from "axios";

const FARM_API = "http://localhost:5000/api/farms";
const ADVISORY_API = "http://localhost:5000/api/advisory";

export default function Advisory() {
  const [farms, setFarms] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState("");

  const [temperature, setTemperature] = useState("");
  const [crop, setCrop] = useState("");

  const [advisory, setAdvisory] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadFarms();
  }, []);

  const getConfig = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const loadFarms = async () => {
    try {
      const response = await axios.get(
        FARM_API,
        getConfig()
      );

      setFarms(response.data);

      if (response.data.length > 0) {
        setSelectedFarm(response.data[0]._id);
      }
    } catch (err) {
      console.error(err);
      setError("Unable to load your farms.");
    }
  };

  const handleFarmChange = (e) => {
    const farmId = e.target.value;

    setSelectedFarm(farmId);
    setAdvisory(null);

    const farm = farms.find(
      (item) => item._id === farmId
    );

    if (farm) {
      setCrop(farm.crop || "");
    }
  };

  const getAdvisory = async () => {
    setError("");
    setAdvisory(null);

    const farm = farms.find(
      (item) => item._id === selectedFarm
    );

    if (!farm) {
      setError("Please select a farm.");
      return;
    }

    try {
      setLoading(true);

      /*
       * Get weather.
       *
       * For now we use Bengaluru.
       * Later we'll connect the farm's latitude
       * and longitude to weather automatically.
       */
      const weatherResponse = await axios.get(
        "http://localhost:5000/api/weather?lat=12.9716&lon=77.5946"
      );

      const currentTemperature =
        weatherResponse.data.main.temp;

      setTemperature(currentTemperature);

      // Send farm information to advisory backend
      const response = await axios.post(
        ADVISORY_API,
        {
          soilType: farm.soilType,
          temperature: currentTemperature,
          crop: farm.crop,
        },
        getConfig()
      );

      setAdvisory(response.data);

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to generate advisory."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>

      <div style={styles.container}>

        <h1 style={styles.title}>
          🌾 Smart Crop Advisory
        </h1>

        <p style={styles.subtitle}>
          Get farming recommendations based on your
          farm and current weather.
        </p>


        {error && (
          <div style={styles.error}>
            ⚠️ {error}
          </div>
        )}


        {farms.length === 0 ? (

          <div style={styles.card}>
            <h2>No Farms Available</h2>

            <p>
              Please add a farm before requesting
              an advisory.
            </p>
          </div>

        ) : (

          <div style={styles.card}>

            <h2 style={styles.cardTitle}>
              🌱 Select Your Farm
            </h2>

            <select
              value={selectedFarm}
              onChange={handleFarmChange}
              style={styles.select}
            >

              {farms.map((farm) => (

                <option
                  key={farm._id}
                  value={farm._id}
                >
                  {farm.name}
                  {farm.crop
                    ? ` - ${farm.crop}`
                    : ""}
                </option>

              ))}

            </select>


            {selectedFarm && (
              <div style={styles.farmInfo}>

                {(() => {
                  const farm = farms.find(
                    (item) =>
                      item._id === selectedFarm
                  );

                  if (!farm) return null;

                  return (
                    <>
                      <h3>
                        🌾 {farm.name}
                      </h3>

                      <p>
                        🌱 Crop:{" "}
                        <strong>
                          {farm.crop ||
                            "Not specified"}
                        </strong>
                      </p>

                      <p>
                        🪨 Soil:{" "}
                        <strong>
                          {farm.soilType}
                        </strong>
                      </p>

                      <p>
                        📐 Area:{" "}
                        <strong>
                          {farm.area || 0} acres
                        </strong>
                      </p>

                      <p>
                        📍 Location:{" "}
                        <strong>
                          {farm.location?.name ||
                            "Not specified"}
                        </strong>
                      </p>
                    </>
                  );
                })()}

              </div>
            )}


            <button
              onClick={getAdvisory}
              disabled={loading}
              style={styles.button}
            >
              {loading
                ? "🤖 Generating Advisory..."
                : "🌱 Get Smart Advisory"}
            </button>

          </div>

        )}


        {temperature !== "" && (
          <div style={styles.weatherCard}>

            <h2>
              🌤️ Current Weather
            </h2>

            <p style={styles.temperature}>
              {temperature}°C
            </p>

            <p>
              Current temperature used for
              recommendation
            </p>

          </div>
        )}


        {advisory && (
          <div style={styles.resultCard}>

            <h2 style={styles.resultTitle}>
              🤖 Smart Advisory
            </h2>

            <div style={styles.recommendation}>

              <h3>
                🌱 Recommended Crop
              </h3>

              <p style={styles.crop}>
                {advisory.recommendedCrop}
              </p>

            </div>


            {advisory.irrigationAdvice && (
              <div style={styles.adviceBox}>
                💧{" "}
                <strong>
                  Irrigation:
                </strong>

                <p>
                  {advisory.irrigationAdvice}
                </p>
              </div>
            )}


            {advisory.fertilizerAdvice && (
              <div style={styles.adviceBox}>
                🌿{" "}
                <strong>
                  Fertilizer:
                </strong>

                <p>
                  {advisory.fertilizerAdvice}
                </p>
              </div>
            )}


            {advisory.protectionAdvice && (
              <div style={styles.adviceBox}>
                🛡️{" "}
                <strong>
                  Crop Protection:
                </strong>

                <p>
                  {advisory.protectionAdvice}
                </p>
              </div>
            )}

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
    padding: "35px 20px",
  },

  container: {
    maxWidth: "900px",
    margin: "auto",
  },

  title: {
    color: "#234d20",
    marginBottom: "5px",
  },

  subtitle: {
    color: "#777",
    marginBottom: "25px",
  },

  card: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "15px",
    marginBottom: "20px",
    boxShadow:
      "0 5px 20px rgba(0,0,0,0.06)",
  },

  cardTitle: {
    color: "#234d20",
  },

  select: {
    width: "100%",
    padding: "13px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "16px",
  },

  farmInfo: {
    background: "#f4f8f3",
    padding: "18px",
    borderRadius: "10px",
    marginTop: "18px",
  },

  button: {
    width: "100%",
    marginTop: "20px",
    padding: "14px",
    border: "none",
    borderRadius: "8px",
    background: "#2e7d32",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  weatherCard: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "15px",
    marginBottom: "20px",
    textAlign: "center",
    boxShadow:
      "0 5px 20px rgba(0,0,0,0.06)",
  },

  temperature: {
    fontSize: "40px",
    fontWeight: "bold",
    color: "#2e7d32",
    margin: "10px",
  },

  resultCard: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "15px",
    boxShadow:
      "0 5px 20px rgba(0,0,0,0.08)",
  },

  resultTitle: {
    color: "#234d20",
  },

  recommendation: {
    background: "#e8f5e9",
    padding: "18px",
    borderRadius: "10px",
    marginBottom: "15px",
  },

  crop: {
    fontSize: "25px",
    fontWeight: "bold",
    color: "#2e7d32",
  },

  adviceBox: {
    background: "#f7f9f6",
    padding: "15px",
    borderRadius: "8px",
    marginTop: "12px",
  },

  error: {
    background: "#ffebee",
    color: "#c62828",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "20px",
  },
};