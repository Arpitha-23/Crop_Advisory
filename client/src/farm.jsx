import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/farms";

export default function Farm() {
  const [farms, setFarms] = useState([]);

  const [name, setName] = useState("");
  const [crop, setCrop] = useState("");
  const [soilType, setSoilType] = useState("");
  const [area, setArea] = useState("");
  const [locationName, setLocationName] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadFarms();
  }, []);

  // Get JWT token
  const getToken = () => {
    return localStorage.getItem("token");
  };

  // Axios headers
  const getConfig = () => {
    return {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };
  };

  // Load only logged-in user's farms
  const loadFarms = async () => {
    try {
      setError("");

      const res = await axios.get(
        API,
        getConfig()
      );

      setFarms(res.data);

    } catch (err) {
      console.error(err);

      if (err.response?.status === 401) {
        setError(
          "Please login to view your farms."
        );
      } else {
        setError(
          "Unable to load farms."
        );
      }
    }
  };

  // Add farm
  const addFarm = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!name || !soilType) {
      setError(
        "Farm name and soil type are required."
      );
      return;
    }

    try {
      await axios.post(
        API,
        {
          name,
          crop,
          soilType,
          area: Number(area) || 0,

          location: {
            name: locationName,
          },
        },
        getConfig()
      );

      setMessage(
        "🌱 Farm added successfully!"
      );

      // Clear form
      setName("");
      setCrop("");
      setSoilType("");
      setArea("");
      setLocationName("");

      // Reload farms
      loadFarms();

    } catch (err) {
      console.error(err);

      if (err.response?.status === 401) {
        setError(
          "Please login before adding a farm."
        );
      } else {
        setError(
          err.response?.data?.message ||
            "Unable to add farm."
        );
      }
    }
  };

  return (
    <div style={styles.page}>

      <div style={styles.container}>

        <h1 style={styles.title}>
          🌾 Farm Management
        </h1>

        <p style={styles.subtitle}>
          Add and manage your farms
        </p>

        {/* Messages */}

        {message && (
          <div style={styles.success}>
            {message}
          </div>
        )}

        {error && (
          <div style={styles.error}>
            ⚠️ {error}
          </div>
        )}


        {/* ADD FARM */}

        <div style={styles.card}>

          <h2 style={styles.cardTitle}>
            ➕ Add New Farm
          </h2>

          <form onSubmit={addFarm}>

            <label style={styles.label}>
              Farm Name
            </label>

            <input
              type="text"
              placeholder="Example: Green Valley Farm"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              style={styles.input}
            />


            <label style={styles.label}>
              Crop
            </label>

            <input
              type="text"
              placeholder="Example: Tomato"
              value={crop}
              onChange={(e) =>
                setCrop(e.target.value)
              }
              style={styles.input}
            />


            <label style={styles.label}>
              Soil Type
            </label>

            <select
              value={soilType}
              onChange={(e) =>
                setSoilType(e.target.value)
              }
              style={styles.input}
            >

              <option value="">
                Select soil type
              </option>

              <option value="black">
                Black Soil
              </option>

              <option value="red">
                Red Soil
              </option>

              <option value="sandy">
                Sandy Soil
              </option>

              <option value="loamy">
                Loamy Soil
              </option>

              <option value="clay">
                Clay Soil
              </option>

            </select>


            <label style={styles.label}>
              Area (acres)
            </label>

            <input
              type="number"
              placeholder="Example: 2"
              value={area}
              onChange={(e) =>
                setArea(e.target.value)
              }
              style={styles.input}
            />


            <label style={styles.label}>
              Location
            </label>

            <input
              type="text"
              placeholder="Example: Bengaluru"
              value={locationName}
              onChange={(e) =>
                setLocationName(e.target.value)
              }
              style={styles.input}
            />


            <button
              type="submit"
              style={styles.button}
            >
              🌱 Add Farm
            </button>

          </form>

        </div>


        {/* FARM LIST */}

        <div style={styles.card}>

          <h2 style={styles.cardTitle}>
            🌾 My Farms
          </h2>

          {farms.length === 0 ? (

            <div style={styles.empty}>

              <div style={styles.emptyIcon}>
                🌱
              </div>

              <h3>
                No farms found
              </h3>

              <p>
                Add your first farm using the
                form above.
              </p>

            </div>

          ) : (

            <div style={styles.grid}>

              {farms.map((farm) => (

                <div
                  key={farm._id}
                  style={styles.farmCard}
                >

                  <div style={styles.farmIcon}>
                    🌾
                  </div>

                  <h3 style={styles.farmName}>
                    {farm.name}
                  </h3>

                  <p>
                    🌱 Crop:{" "}
                    <strong>
                      {farm.crop || "Not specified"}
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

                </div>

              ))}

            </div>

          )}

        </div>

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
    maxWidth: "1000px",
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
    marginBottom: "25px",
    boxShadow:
      "0 5px 20px rgba(0,0,0,0.06)",
  },

  cardTitle: {
    color: "#234d20",
    marginTop: 0,
  },

  label: {
    display: "block",
    marginTop: "15px",
    marginBottom: "6px",
    fontWeight: "bold",
    color: "#444",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "15px",
  },

  button: {
    marginTop: "20px",
    width: "100%",
    padding: "13px",
    background: "#2e7d32",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  success: {
    background: "#e8f5e9",
    color: "#2e7d32",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "20px",
  },

  error: {
    background: "#ffebee",
    color: "#c62828",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "18px",
  },

  farmCard: {
    border: "1px solid #e1e6df",
    borderRadius: "12px",
    padding: "20px",
  },

  farmIcon: {
    fontSize: "40px",
  },

  farmName: {
    color: "#234d20",
  },

  empty: {
    textAlign: "center",
    padding: "30px",
    color: "#777",
  },

  emptyIcon: {
    fontSize: "50px",
  },
};