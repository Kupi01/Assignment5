import express from "express";
import morgan from "morgan";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";

const app = express();

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

export default app;