import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";

import groupRoutes from "./routes/group.routes.js";
import venueRoutes from "./routes/venue.routes.js";

// function callings 
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// connect db before starting the server
connectDB();

app.use(express.json()); // allow to accept json data in body
app.use(cors()); // allow to accept request from other domain

// routes
app.use('/api/groups', groupRoutes);
app.use('/api/venues', venueRoutes);

// server detector
app.listen(PORT, () => {
    console.log("Server started at http://localhost:" + PORT);
});