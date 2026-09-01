import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config.js";

import authroutes from "./routes/authroutes.js";
import farmroutes from "./routes/farmroutes.js";
import weatherRoutes from "./routes/weatherRoutes.js";
import advisoryroutes from "./routes/advisoryroutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Crop Advisory API Running"));

app.use("/api/auth", authroutes);
app.use("/api/farms", farmroutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/advisory", advisoryroutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on " + PORT));