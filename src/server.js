import dotenv from "dotenv";
dotenv.config();

import express from "express";

// Import database and models
 

// Import routes
import dailyReportRoutes from './routes/dailyreportRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
 
import models, { sequelize } from "./models/index.js";

const { User, Project, DailyReport } = models;

// Initialize Express
const app = express();
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

app.use("/api/projects", projectRoutes);

app.use('/api/daily-reports', dailyReportRoutes);

// Test root route
app.get("/", (req, res) => {
  res.json({ message: "Construction backend — server running" });
});

// Start server function
const startServer = async () => {
  try {
    // Test DB connection
    await sequelize.authenticate();
    console.log("✅ MySQL connection successful");

    // Sync all models
    await sequelize.sync({ alter: true }); // { force: true } to reset DB
    console.log("✅ Database synced successfully!");

    // Start Express server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
  } catch (error) {
    console.error("❌ Server startup failed:", error);
  }
};

// Start everything
startServer();
