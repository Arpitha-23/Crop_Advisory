import mongoose from "mongoose";

const advisorySchema = new mongoose.Schema(
  {
    farmId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farm",
    },

    soilType: {
      type: String,
      required: true,
    },

    temperature: {
      type: Number,
      required: true,
    },

    humidity: {
      type: Number,
    },

    rainfall: {
      type: Number,
      default: 0,
    },

    currentCrop: {
      type: String,
    },

    recommendedCrop: {
      type: String,
      required: true,
    },

    reason: {
      type: String,
    },

    irrigationAdvice: {
      type: String,
    },

    fertilizerAdvice: {
      type: String,
    },

    weatherAlert: {
      type: String,
    },

    cropAdvice: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Advisory", advisorySchema);