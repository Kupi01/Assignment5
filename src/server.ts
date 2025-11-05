import app from "./app";

/**
 * Server entry point following course patterns
 * Starts Express application on specified port
 * 
 * Configuration:
 * - Uses PORT environment variable or defaults to 3000
 * - Provides startup confirmation in console
 * - Simple server setup following course examples
 */

/**
 * Server port configuration
 * Uses environment variable PORT or defaults to 3000 for local development
 */
const PORT = process.env.PORT || 3000;

/**
 * Start the Express server
 * Binds to specified port and logs startup message
 */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});