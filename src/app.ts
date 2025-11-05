import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import setupSwagger from "../config/swagger";
import { getHelmetConfig } from "../config/helmetConfig";
import { getCorsOptions } from "../config/corsConfig";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";

// Load environment variables
dotenv.config();

const app = express();

// Apply security configurations using extracted configs
app.use(getHelmetConfig());
app.use(cors(getCorsOptions()));

app.use(express.json());
app.use(morgan("combined"));

// Health check endpoint
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

// Mount Employee API routes
app.use("/api/v1/employees", employeeRoutes);

// Mount Branch API routes
app.use("/api/v1/branches", branchRoutes);

// Setup Swagger documentation
setupSwagger(app);

export default app;