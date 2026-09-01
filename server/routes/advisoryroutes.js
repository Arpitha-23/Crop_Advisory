import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      soilType,
      temperature,
      crop,
    } = req.body;

    if (!soilType || temperature === undefined) {
      return res.status(400).json({
        message: "Soil type and temperature are required",
      });
    }

    const temp = Number(temperature);

    let recommendedCrop = "Rice";
    let irrigationAdvice =
      "Maintain regular irrigation based on soil moisture.";
    let fertilizerAdvice =
      "Use balanced NPK fertilizer according to soil requirements.";
    let protectionAdvice =
      "Monitor the crop regularly for pests and diseases.";

    // =====================================
    // CROP RECOMMENDATION
    // =====================================

    if (soilType.toLowerCase() === "black") {
      recommendedCrop = "Cotton";
    } else if (soilType.toLowerCase() === "red") {
      recommendedCrop = "Groundnut";
    } else if (soilType.toLowerCase() === "sandy") {
      recommendedCrop = "Millets";
    } else if (soilType.toLowerCase() === "loamy") {
      recommendedCrop = "Tomato";
    } else if (soilType.toLowerCase() === "clay") {
      recommendedCrop = "Rice";
    }

    // =====================================
    // TEMPERATURE-BASED ADJUSTMENT
    // =====================================

    if (temp > 30 && soilType.toLowerCase() === "black") {
      recommendedCrop = "Cotton";
    }

    if (temp > 30 && soilType.toLowerCase() === "red") {
      recommendedCrop = "Millets";
    }

    // =====================================
    // IRRIGATION ADVICE
    // =====================================

    if (temp >= 35) {
      irrigationAdvice =
        "High temperature detected. Irrigate early morning or evening and monitor soil moisture frequently.";
    } else if (temp >= 30) {
      irrigationAdvice =
        "Moderate-to-high temperature. Provide regular irrigation and avoid watering during peak afternoon heat.";
    } else if (temp < 20) {
      irrigationAdvice =
        "Cool conditions detected. Reduce irrigation frequency and avoid waterlogging.";
    } else {
      irrigationAdvice =
        "Maintain regular irrigation according to soil moisture and crop growth stage.";
    }

    // =====================================
    // SOIL-BASED FERTILIZER ADVICE
    // =====================================

    if (soilType.toLowerCase() === "black") {
      fertilizerAdvice =
        "Use nitrogen and phosphorus based fertilizer appropriately. Add organic matter to maintain soil fertility.";
    } else if (soilType.toLowerCase() === "red") {
      fertilizerAdvice =
        "Red soil may require additional nitrogen, phosphorus and organic manure. Consider soil testing before application.";
    } else if (soilType.toLowerCase() === "sandy") {
      fertilizerAdvice =
        "Apply organic manure and split fertilizer applications to reduce nutrient loss from sandy soil.";
    } else if (soilType.toLowerCase() === "loamy") {
      fertilizerAdvice =
        "Loamy soil generally supports good crop growth. Use balanced NPK and organic compost based on soil-test results.";
    } else if (soilType.toLowerCase() === "clay") {
      fertilizerAdvice =
        "Use organic matter and balanced fertilizer. Avoid excessive fertilizer application and waterlogging.";
    }

    // =====================================
    // CROP PROTECTION
    // =====================================

    if (crop) {
      const cropName = crop.toLowerCase();

      if (cropName.includes("tomato")) {
        protectionAdvice =
          "Monitor tomatoes for early blight, late blight, aphids and fruit borers. Remove infected leaves and maintain good field ventilation.";
      } else if (cropName.includes("cotton")) {
        protectionAdvice =
          "Monitor cotton regularly for bollworms, aphids and whiteflies. Use integrated pest management practices.";
      } else if (cropName.includes("groundnut")) {
        protectionAdvice =
          "Monitor groundnut for leaf spot and soil pests. Maintain proper spacing and avoid excessive moisture.";
      } else if (cropName.includes("rice")) {
        protectionAdvice =
          "Monitor rice for stem borers, leaf folders and fungal diseases. Maintain proper water management.";
      } else if (cropName.includes("millet")) {
        protectionAdvice =
          "Monitor millets for shoot fly and fungal diseases. Maintain field sanitation and proper spacing.";
      }
    }

    // =====================================
    // RESPONSE
    // =====================================

    res.json({
      success: true,

      farmCrop: crop || "Not specified",

      soilType,

      temperature: temp,

      recommendedCrop,

      irrigationAdvice,

      fertilizerAdvice,

      protectionAdvice,
    });

  } catch (error) {
    console.error(
      "Advisory error:",
      error
    );

    res.status(500).json({
      message: "Unable to generate advisory",
      error: error.message,
    });
  }
});

export default router;