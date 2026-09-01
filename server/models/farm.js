import mongoose from "mongoose";

const farmSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    crop: {
      type: String,
      default: "",
    },

    soilType: {
      type: String,
      required: true,
    },

    area: {
      type: Number,
      default: 0,
    },

    location: {
      name: {
        type: String,
        default: "",
      },

      lat: {
        type: Number,
      },

      lon: {
        type: Number,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Farm", farmSchema);