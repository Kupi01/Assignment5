# Assignment 5 - API Documentation and Security Enhancement

This is my submission for Module 5, focusing on API documentation and security features.

## Project Overview
I enhanced the employee and branch management API from Module 3 by adding:
- Security features (Helmet.js and CORS)
- Environment variable management with dotenv
- API documentation using Swagger/OpenAPI
- Documentation deployment using GitHub Pages

## Setup Instructions

1. Clone the repo and install dependencies:
```bash
npm install
```

2. Create a `.env` file with these variables:
```
PORT=3000
NODE_ENV=development
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
CORS_ORIGIN=http://localhost:3000
```

3. Run the server:
```bash
npm run dev
```

## API Examples

Here's how to use some of the endpoints:

### Get All Employees
```javascript
// Using Fetch API
fetch('http://localhost:3000/api/v1/employees')
  .then(response => response.json())
  .then(data => console.log(data));
```

### Create New Branch
```javascript
// Using Fetch API
fetch('http://localhost:3000/api/v1/branches', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: "Downtown Branch",
    address: "123 Main St",
    phone: "2045551234"
  })
});
```

## Security Features

Added these security features:
- Helmet.js for security headers
- CORS configuration for API security
- Environment variables for sensitive data

## Documentation
- Swagger UI: http://localhost:3000/api-docs
- GitHub Pages: https://kupi01.github.io/Assignment5

## Available Scripts
- `npm run dev` - Run development server
- `npm run build` - Build the project
- `npm run generate-docs` - Generate API docs
- `npm test` - Run tests

---
Kupit Patel
Red River College Polytechnic
Back-End Development