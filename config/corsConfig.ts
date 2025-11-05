// CORS Configuration following course patterns
const getCorsOptions = () => {
    const isDevelopment = process.env.NODE_ENV === "development";

    if (isDevelopment) {
        // Allow all origins in development for easy testing (from course content)
        return {
            origin: true,
            credentials: true,
        };
    }

    // Strict origins in production (from course content)
    return {
        origin: process.env.ALLOWED_ORIGINS?.split(",") || [],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    };
};

export { getCorsOptions };