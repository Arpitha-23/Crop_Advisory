import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const FARM_API = "http://localhost:5000/api/farms";

export default function Home() {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await axios.get(FARM_API);
      setFarms(response.data);
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalFarms = farms.length;

  const crops = [
    ...new Set(
      farms
        .map((farm) => farm.crop)
        .filter((crop) => crop)
    ),
  ];

  const soilTypes = [
    ...new Set(
      farms
        .map((farm) => farm.soilType)
        .filter((soil) => soil)
    ),
  ];

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* HERO */}

        <div style={styles.hero}>

          <div>
            <p style={styles.welcome}>
              🌱 SMART AGRICULTURE
            </p>

            <h1 style={styles.heroTitle}>
              Welcome to Crop Advisor
            </h1>

            <p style={styles.heroText}>
              Make better farming decisions using farm
              information, real-time weather and smart
              crop recommendations.
            </p>

            <div style={styles.heroButtons}>

              <Link
                to="/farms"
                style={styles.primaryButton}
              >
                🌾 Manage Farms
              </Link>

              <Link
                to="/advisory"
                style={styles.secondaryButton}
              >
                🤖 Get Advisory
              </Link>

            </div>
          </div>

          <div style={styles.heroIcon}>
            🌾
          </div>

        </div>


        {/* STATISTICS */}

        <div style={styles.statsGrid}>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>🌾</div>

            <div>
              <p style={styles.statLabel}>
                Total Farms
              </p>

              <h2 style={styles.statNumber}>
                {loading ? "..." : totalFarms}
              </h2>
            </div>
          </div>


          <div style={styles.statCard}>
            <div style={styles.statIcon}>🌱</div>

            <div>
              <p style={styles.statLabel}>
                Crops
              </p>

              <h2 style={styles.statNumber}>
                {loading ? "..." : crops.length}
              </h2>
            </div>
          </div>


          <div style={styles.statCard}>
            <div style={styles.statIcon}>🪨</div>

            <div>
              <p style={styles.statLabel}>
                Soil Types
              </p>

              <h2 style={styles.statNumber}>
                {loading ? "..." : soilTypes.length}
              </h2>
            </div>
          </div>


          <div style={styles.statCard}>
            <div style={styles.statIcon}>🤖</div>

            <div>
              <p style={styles.statLabel}>
                AI Advisory
              </p>

              <h2 style={styles.statNumber}>
                Ready
              </h2>
            </div>
          </div>

        </div>


        {/* FEATURES */}

        <h2 style={styles.sectionTitle}>
          Smart Farming Tools
        </h2>

        <div style={styles.featureGrid}>

          <Link
            to="/farms"
            style={styles.featureCard}
          >

            <div style={styles.featureIcon}>
              🌾
            </div>

            <h3>
              Farm Management
            </h3>

            <p>
              Add and manage your farms, crops, soil,
              area and location information.
            </p>

            <span style={styles.learnMore}>
              Manage Farms →
            </span>

          </Link>


          <Link
            to="/weather"
            style={styles.featureCard}
          >

            <div style={styles.featureIcon}>
              🌦️
            </div>

            <h3>
              Weather Monitoring
            </h3>

            <p>
              Monitor current temperature, humidity,
              wind and weather conditions.
            </p>

            <span style={styles.learnMore}>
              Check Weather →
            </span>

          </Link>


          <Link
            to="/advisory"
            style={styles.featureCard}
          >

            <div style={styles.featureIcon}>
              🤖
            </div>

            <h3>
              Crop Advisory
            </h3>

            <p>
              Get crop recommendations and personalized
              irrigation, fertilizer and protection advice.
            </p>

            <span style={styles.learnMore}>
              Get Advisory →
            </span>

          </Link>

        </div>


        {/* FARM SUMMARY */}

        <div style={styles.card}>

          <div style={styles.cardHeader}>

            <div>
              <h2 style={styles.cardTitle}>
                🌱 My Farms
              </h2>

              <p style={styles.cardSubtitle}>
                Your registered farms
              </p>
            </div>

            <Link
              to="/farms"
              style={styles.viewButton}
            >
              View All
            </Link>

          </div>


          {loading ? (
            <p>Loading farms...</p>
          ) : farms.length === 0 ? (

            <div style={styles.empty}>
              <div style={styles.emptyIcon}>
                🌾
              </div>

              <h3>
                No farms added yet
              </h3>

              <p>
                Add your first farm to start receiving
                smart agricultural recommendations.
              </p>

              <Link
                to="/farms"
                style={styles.primaryButton}
              >
                + Add Farm
              </Link>
            </div>

          ) : (

            <div style={styles.farmGrid}>

              {farms.slice(0, 4).map((farm) => (

                <div
                  key={farm._id}
                  style={styles.farmCard}
                >

                  <div style={styles.farmTop}>

                    <div style={styles.farmIcon}>
                      🌾
                    </div>

                    <div>
                      <h3 style={styles.farmName}>
                        {farm.name}
                      </h3>

                      <p style={styles.location}>
                        📍{" "}
                        {farm.location?.name ||
                          "Location not specified"}
                      </p>
                    </div>

                  </div>


                  <div style={styles.farmDetails}>

                    <span>
                      🌱 {farm.crop || "Crop not specified"}
                    </span>

                    <span>
                      🪨 {farm.soilType || "Soil not specified"}
                    </span>

                    <span>
                      📐 {farm.area || "-"} acres
                    </span>

                  </div>


                  <Link
                    to="/advisory"
                    style={styles.advisoryButton}
                  >
                    🤖 Get Advisory
                  </Link>

                </div>

              ))}

            </div>

          )}

        </div>


        {/* HOW IT WORKS */}

        <div style={styles.howSection}>

          <h2 style={styles.sectionTitle}>
            How Crop Advisor Works
          </h2>

          <div style={styles.steps}>

            <div style={styles.step}>
              <div style={styles.stepNumber}>
                1
              </div>

              <h3>
                Add Your Farm
              </h3>

              <p>
                Enter your crop, soil, area and location.
              </p>
            </div>


            <div style={styles.step}>
              <div style={styles.stepNumber}>
                2
              </div>

              <h3>
                Check Weather
              </h3>

              <p>
                Get current weather information for your
                farm.
              </p>
            </div>


            <div style={styles.step}>
              <div style={styles.stepNumber}>
                3
              </div>

              <h3>
                Get Advisory
              </h3>

              <p>
                Receive smart crop and farming
                recommendations.
              </p>
            </div>


            <div style={styles.step}>
              <div style={styles.stepNumber}>
                4
              </div>

              <h3>
                Track History
              </h3>

              <p>
                Review your previous crop advisories.
              </p>
            </div>

          </div>

        </div>


        {/* FOOTER */}

        <footer style={styles.footer}>
          <p>
            🌱 Crop Advisor — Smart Farming for Better
            Decisions
          </p>

          <p style={styles.footerSmall}>
            SIH Project Prototype
          </p>
        </footer>

      </div>
    </div>
  );
}


/* =========================
   STYLES
========================= */

const styles = {

  page: {
    minHeight: "100vh",
    background: "#f4f7f2",
    padding: "30px 20px",
  },

  container: {
    maxWidth: "1100px",
    margin: "auto",
  },

  hero: {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "45px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.07)",
  },

  welcome: {
    color: "#2e7d32",
    fontWeight: "bold",
    letterSpacing: "1px",
  },

  heroTitle: {
    color: "#234d20",
    fontSize: "42px",
    margin: "10px 0",
  },

  heroText: {
    color: "#667266",
    maxWidth: "650px",
    fontSize: "17px",
    lineHeight: "1.6",
  },

  heroIcon: {
    fontSize: "100px",
  },

  heroButtons: {
    display: "flex",
    gap: "12px",
    marginTop: "25px",
    flexWrap: "wrap",
  },

  primaryButton: {
    display: "inline-block",
    background: "#2e7d32",
    color: "white",
    textDecoration: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    fontWeight: "bold",
  },

  secondaryButton: {
    display: "inline-block",
    background: "#e8f5e9",
    color: "#2e7d32",
    textDecoration: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    fontWeight: "bold",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(210px, 1fr))",
    gap: "18px",
    marginBottom: "35px",
  },

  statCard: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
  },

  statIcon: {
    fontSize: "35px",
  },

  statLabel: {
    color: "#777",
    margin: 0,
  },

  statNumber: {
    color: "#234d20",
    margin: "5px 0 0",
  },

  sectionTitle: {
    color: "#234d20",
    marginBottom: "20px",
  },

  featureGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginBottom: "35px",
  },

  featureCard: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "15px",
    textDecoration: "none",
    color: "#333",
    boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
  },

  featureIcon: {
    fontSize: "40px",
  },

  learnMore: {
    color: "#2e7d32",
    fontWeight: "bold",
  },

  card: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "15px",
    marginBottom: "35px",
    boxShadow: "0 5px 18px rgba(0,0,0,0.07)",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  cardTitle: {
    color: "#234d20",
    margin: 0,
  },

  cardSubtitle: {
    color: "#777",
  },

  viewButton: {
    color: "#2e7d32",
    textDecoration: "none",
    fontWeight: "bold",
  },

  empty: {
    textAlign: "center",
    padding: "35px",
  },

  emptyIcon: {
    fontSize: "50px",
  },

  farmGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "18px",
  },

  farmCard: {
    border: "1px solid #e4e8e2",
    borderRadius: "12px",
    padding: "18px",
  },

  farmTop: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  farmIcon: {
    fontSize: "35px",
  },

  farmName: {
    margin: 0,
    color: "#234d20",
  },

  location: {
    color: "#777",
    fontSize: "14px",
  },

  farmDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    margin: "15px 0",
    color: "#555",
  },

  advisoryButton: {
    display: "block",
    textAlign: "center",
    background: "#e8f5e9",
    color: "#2e7d32",
    padding: "9px",
    borderRadius: "7px",
    textDecoration: "none",
    fontWeight: "bold",
  },

  howSection: {
    marginBottom: "35px",
  },

  steps: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(210px, 1fr))",
    gap: "20px",
  },

  step: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
  },

  stepNumber: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#2e7d32",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    fontWeight: "bold",
  },

  footer: {
    textAlign: "center",
    padding: "25px",
    color: "#557055",
  },

  footerSmall: {
    fontSize: "13px",
  },
};