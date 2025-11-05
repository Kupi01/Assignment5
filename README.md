# Employee and Branch Management API

## Project Overview

This is a comprehensive Employee and Branch Management API built with Node.js, Express, and TypeScript. The API provides secure endpoints for managing employees and branches with advanced security configurations, comprehensive documentation, and environment-based configuration management.

### Key Features

- **RESTful API Design** - Full CRUD operations for employees and branches
- **Advanced Security** - Custom Helmet.js and CORS configurations
- **Comprehensive Documentation** - OpenAPI/Swagger documentation with inline JSDoc comments
- **Environment-Based Configuration** - Secure management using dotenv
- **Input Validation** - Joi schema validation with detailed error handling
- **TypeScript Support** - Full type safety and IntelliSense support

## API Endpoints

### Employees
- `GET /api/v1/employees` - Get all employees
- `GET /api/v1/employees/:id` - Get employee by ID
- `POST /api/v1/employees` - Create new employee
- `PUT /api/v1/employees/:id` - Update employee
- `DELETE /api/v1/employees/:id` - Delete employee
- `GET /api/v1/employees/branch/:branchId` - Get employees by branch
- `GET /api/v1/employees/department/:department` - Get employees by department

### Branches
- `GET /api/v1/branches` - Get all branches
- `GET /api/v1/branches/:id` - Get branch by ID
- `POST /api/v1/branches` - Create new branch
- `PUT /api/v1/branches/:id` - Update branch
- `DELETE /api/v1/branches/:id` - Delete branch

## Installation Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm (v8 or higher)

### Setup Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Kupi01/Assignment5.git
   cd Assignment5
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables Setup:**
   
   Create a `.env` file in the root directory with the following variables:
   ```bash
   # Environment Variables for Assignment 5
   # Firebase Configuration
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----"
   FIREBASE_CLIENT_EMAIL=your-client-email@project.iam.gserviceaccount.com

   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # API Configuration
   API_BASE_URL=http://localhost:3000
   API_VERSION=v1

   # Security Configuration
   CORS_ORIGIN=http://localhost:3000,http://localhost:3001
   HELMET_CONTENT_SECURITY_POLICY=true

   # Swagger Configuration
   SWAGGER_SERVER_URL=http://localhost:3000/api/v1
   ```

4. **Build the application:**
   ```bash
   npm run build
   ```

5. **Start the server:**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

6. **Generate API Documentation:**
   ```bash
   npm run generate-docs
   ```

## API Request Examples

### Get All Employees

**Request:**
```javascript
const axios = require('axios');

const config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'http://localhost:3000/api/v1/employees',
  headers: { 
    'Accept': 'application/json'
  }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
```

**Response:**
```json
[
  {
    "id": "1",
    "name": "Alice Johnson",
    "position": "Manager",
    "department": "Operations",
    "email": "alice.johnson@company.com",
    "phone": "2045551234",
    "branchId": "1"
  }
]
```

### Create New Employee

**Request:**
```javascript
const axios = require('axios');
let data = JSON.stringify({
  "name": "John Doe",
  "position": "Software Developer",
  "department": "Engineering",
  "email": "john.doe@company.com",
  "phone": "2045559999",
  "branchId": "1"
});

const config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://localhost:3000/api/v1/employees',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
```

### Get All Branches

**Request:**
```javascript
const axios = require('axios');

const config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'http://localhost:3000/api/v1/branches',
  headers: { 
    'Accept': 'application/json'
  }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
```

## Security Configuration

### Custom Helmet.js Configuration

The API uses custom Helmet.js security configurations optimized for API usage:

```javascript
// Custom Helmet configuration for API security
app.use(
  helmet({
    // Content Security Policy with API-specific settings
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
    // Enhanced security headers
    crossOriginEmbedderPolicy: false, // API compatibility
    referrerPolicy: { policy: "same-origin" },
    hsts: {
      maxAge: 31536000, // 1 year
      includeSubDomains: true,
      preload: true,
    },
  })
);
```

**Security Headers Applied:**
- Strict-Transport-Security (HSTS)
- Content-Security-Policy (CSP)
- X-Content-Type-Options
- X-Frame-Options
- Referrer-Policy
- X-Download-Options

### Custom CORS Configuration

Environment-based CORS configuration for flexible security:

```javascript
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'];
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS policy'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 
    'Authorization', 'Cache-Control', 'Pragma'
  ],
  exposedHeaders: ['X-Total-Count', 'X-Page-Count']
};
```

## Documentation Access

### Local Documentation
When running the application locally, you can access the API documentation at:
- **Swagger UI:** http://localhost:3000/api-docs
- **Generated Docs:** http://localhost:3000/docs/index.html

### Public Documentation
The API documentation is automatically deployed to GitHub Pages at:
- **Live Documentation:** https://kupi01.github.io/Assignment5

## Available Scripts

- `npm run build` - Build the TypeScript application
- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server
- `npm run generate-docs` - Generate OpenAPI documentation
- `npm test` - Run test suite
- `npm run test:watch` - Run tests in watch mode

## Project Structure

```
├── config/
│   ├── firebaseConfig.ts      # Firebase configuration
│   ├── swagger.ts             # Swagger UI setup
│   └── swaggerOptions.ts      # OpenAPI specification
├── src/
│   ├── api/v1/
│   │   ├── controllers/       # Route controllers
│   │   ├── middleware/        # Custom middleware
│   │   ├── repositories/      # Data access layer
│   │   ├── routes/           # API routes with inline documentation
│   │   ├── services/         # Business logic
│   │   └── validation/       # Joi schemas with OpenAPI documentation
│   ├── data/                 # Sample data
│   ├── models/               # TypeScript interfaces
│   ├── app.ts               # Express application setup
│   └── server.ts            # Server entry point
├── scripts/
│   └── generate-openapi.ts   # Documentation generation script
├── docs/                     # Generated documentation
└── test/                     # Test files
```

## Security Best Practices

1. **Environment Variables:** All sensitive configuration is stored in environment variables
2. **Input Validation:** Comprehensive Joi schema validation on all endpoints
3. **Security Headers:** Custom Helmet.js configuration for API security
4. **CORS Protection:** Environment-based origin validation
5. **Error Handling:** Secure error responses without sensitive information exposure

## Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Validation:** Joi
- **Documentation:** OpenAPI 3.0 / Swagger
- **Security:** Helmet.js, CORS
- **Configuration:** dotenv
- **Database:** Firebase Firestore (via Firebase Admin SDK)
- **Testing:** Jest, Supertest

## Contributing

1. Create a feature branch from `development`
2. Make your changes with meaningful commit messages
3. Ensure all tests pass
4. Update documentation as needed
5. Create a pull request to `development` branch

## License

This project is licensed under the ISC License.

---

**Note:** This API was developed as part of Module 5 Assignment for Advanced API Documentation and Security Enhancement at Red River College Polytechnic.