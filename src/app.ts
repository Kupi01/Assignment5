import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import setupSwagger from "../config/swagger";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";

// Load environment variables
dotenv.config();

const app = express();

// Custom Helmet configuration for API security
app.use(
  helmet({
    // Enable Content Security Policy with custom settings for API
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"], // Allow inline scripts for Swagger UI
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        connectSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
    // Enable Cross Origin Embedder Policy for enhanced security
    crossOriginEmbedderPolicy: false, // Set to false for API compatibility
    // Custom referrer policy for API usage
    referrerPolicy: { policy: "same-origin" },
    // Enable Strict Transport Security
    hsts: {
      maxAge: 31536000, // 1 year
      includeSubDomains: true,
      preload: true,
    },
  })
);

// Custom CORS configuration for API security
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'];
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS policy'));
    }
  },
  credentials: true, // Allow cookies and credentials
  optionsSuccessStatus: 200, // Support for legacy browsers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'Cache-Control',
    'Pragma',
  ],
  exposedHeaders: ['X-Total-Count', 'X-Page-Count'], // Expose pagination headers
};

app.use(cors(corsOptions));

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