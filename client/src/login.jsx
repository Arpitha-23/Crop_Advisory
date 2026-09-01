import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      // Save JWT token
      localStorage.setItem(
        "token",
        response.data.token
      );

      // Save user information
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      // Go to dashboard
      navigate("/");

    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
        "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>

      <div style={styles.card}>

        <div style={styles.icon}>
          🌾
        </div>

        <h1 style={styles.title}>
          Crop Advisor
        </h1>

        <p style={styles.subtitle}>
          Farmer Login
        </p>

        {error && (
          <div style={styles.error}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin}>

          <label style={styles.label}>
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={styles.input}
          />

          <label style={styles.label}>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={styles.input}
          />

          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading
              ? "Logging in..."
              : "🔐 Login"}
          </button>

        </form>

        <p style={styles.registerText}>
          Don't have an account?
        </p>

        <Link
          to="/register"
          style={styles.registerLink}
        >
          Create Farmer Account
        </Link>

      </div>

    </div>
  );
}


const styles = {

  page: {
    minHeight: "100vh",
    background: "#f4f7f2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#ffffff",
    padding: "35px",
    borderRadius: "18px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
  },

  icon: {
    textAlign: "center",
    fontSize: "55px",
  },

  title: {
    textAlign: "center",
    color: "#234d20",
    marginBottom: "5px",
  },

  subtitle: {
    textAlign: "center",
    color: "#777",
    marginBottom: "25px",
  },

  label: {
    display: "block",
    marginBottom: "7px",
    color: "#444",
    fontWeight: "bold",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px",
    marginBottom: "18px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "15px",
  },

  button: {
    width: "100%",
    padding: "13px",
    border: "none",
    borderRadius: "8px",
    background: "#2e7d32",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  error: {
    background: "#ffebee",
    color: "#c62828",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "18px",
  },

  registerText: {
    textAlign: "center",
    color: "#777",
    marginBottom: "5px",
    marginTop: "25px",
  },

  registerLink: {
    display: "block",
    textAlign: "center",
    color: "#2e7d32",
    fontWeight: "bold",
    textDecoration: "none",
  },
};