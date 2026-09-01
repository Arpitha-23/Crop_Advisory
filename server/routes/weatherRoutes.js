import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({
        message: "Latitude and longitude are required",
      });
    }

    if (!process.env.WEATHER_KEY) {
      return res.status(500).json({
        message: "Weather API key is not configured",
      });
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_KEY}&units=metric`
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "Weather API Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      message: "Unable to fetch weather data",
      error: error.response?.data?.message || error.message,
    });
  }
});

export default router;