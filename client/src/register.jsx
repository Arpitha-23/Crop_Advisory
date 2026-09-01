import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError("Please fill in name, email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          phone,
          email,
          password,
        }
      );

      setSuccess(
        response.data.message ||
          "Registration successful!"
      );

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>

      <div style={styles.card}>

        <div style={styles.icon}>
          🌱
        </div>

        <h1 style={styles.title}>
          Crop Advisor
        </h1>

        <p style={styles.subtitle}>
          Create Farmer Account
        </p>

        {error && (
          <div style={styles.error}>
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div style={styles.success}>
            ✅ {success}
          </div>
        )}

        <form onSubmit={handleRegister}>

          <label style={styles.label}>
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            style={styles.input}
          />

          <label style={styles.label}>
            Phone Number
          </label>

          <input
            type="tel"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            style={styles.input}
          />

          <label style={styles.label}>
            Email
          </label>

          <input
            type="email"
            placeholder="Enter email"
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
            placeholder="Create password"
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
              ? "Creating Account..."
              : "🌾 Create Account"}
          </button>

        </form>

        <p style={styles.loginText}>
          Already have an account?
        </p>

        <Link
          to="/login"
          style={styles.loginLink}
        >
          Login here
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
    maxWidth: "440px",
    background: "#ffffff",
    padding: "35px",
    borderRadius: "18px",
    boxShadow:
      "0 8px 30px rgba(0,0,0,0.08)",
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
    marginBottom: "17px",
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

  success: {
    background: "#e8f5e9",
    color: "#2e7d32",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "18px",
  },

  loginText: {
    textAlign: "center",
    color: "#777",
    marginBottom: "5px",
    marginTop: "25px",
  },

  loginLink: {
    display: "block",
    textAlign: "center",
    color: "#2e7d32",
    fontWeight: "bold",
    textDecoration: "none",
  },
};