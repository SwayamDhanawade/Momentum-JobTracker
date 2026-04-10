# Momentum - Job Application Tracker

A full-stack web application for managing your job search process. Track applications, interviews, and reminders in one organized place.

![Job Tracker](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Java](https://img.shields.io/badge/Java-17-blue)
![React](https://img.shields.io/badge/React-18-61dafb)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-6db33f)

## Features

- **User Authentication** - Secure JWT-based registration and login
- **Job Application Management** - Track applications with detailed information
- **Status Tracking** - Visual pipeline with customizable statuses
- **Interview Scheduling** - Schedule and track interview details
- **Reminders** - Set reminders for follow-ups and deadlines
- **Dashboard Analytics** - Visual statistics and recent activity
- **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

### Backend
- **Java 17** - Modern Java with records and pattern matching
- **Spring Boot 3.2** - Production-ready Spring framework
- **Spring Data JPA** - Simplified data access
- **Spring Security** - Comprehensive security
- **MySQL** - Reliable relational database
- **JWT** - Stateless authentication

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast development and building
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS Variables** - Consistent theming

## Architecture

```
job-application-tracker/
├── backend/                    # Spring Boot API
│   └── src/main/java/com/jobtracker/
│       ├── config/            # Security, CORS, Data initialization
│       ├── controller/        # REST API endpoints
│       ├── dto/               # Request/Response objects
│       ├── entity/            # JPA entities
│       ├── exception/         # Global exception handling
│       ├── repository/        # Data access layer
│       ├── security/          # JWT authentication
│       └── service/           # Business logic
│
├── frontend/                   # React SPA
│   └── src/
│       ├── components/        # Reusable UI components
│       ├── contexts/          # React contexts (Auth)
│       ├── pages/             # Page components
│       ├── routes/            # Route definitions
│       ├── services/          # API services
│       ├── types/             # TypeScript interfaces
│       └── styles/            # Global styles
│
├── README.md
└── .gitignore
```

## Key Technical Decisions

1. **JWT Stateless Authentication** - Scalable auth without server-side sessions
2. **RESTful API Design** - Clean, predictable API endpoints
3. **JPA Entities with Lombok** - Reduced boilerplate, better maintainability
4. **Environment-based Configuration** - Easy deployment to different environments
5. **Component-based Architecture** - Reusable, testable UI components
6. **TypeScript** - Catch errors early, better IDE support

## Getting Started

### Prerequisites

- Java 17 or higher
- Node.js 18 or higher
- MySQL 8.0 or higher
- Maven 3.8+ (or use included Maven wrapper)

### Database Setup

1. Create a MySQL database:

```sql
CREATE DATABASE job_tracker CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. Update your credentials (or use environment variables):

```bash
# Environment variables (recommended for production)
export DB_HOST=localhost
export DB_PORT=3306
export DB_NAME=job_tracker
export DB_USERNAME=root
export DB_PASSWORD=your_password
```

### Backend

```bash
cd job-application-tracker/backend

# Using Maven wrapper (recommended)
./mvnw spring-boot:run

# Or using system Maven
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### Frontend

```bash
cd job-application-tracker/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start on `http://localhost:3000`

### Demo Account

On first startup, a demo account is automatically created:

- **Email:** `demo@example.com`
- **Password:** `password123`

## Environment Variables

### Backend

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 8080 |
| `DB_HOST` | Database host | localhost |
| `DB_PORT` | Database port | 3306 |
| `DB_NAME` | Database name | job_tracker |
| `DB_USERNAME` | Database user | root |
| `DB_PASSWORD` | Database password | (none) |
| `JWT_SECRET` | JWT signing key | (built-in) |
| `JWT_EXPIRATION` | Token expiration (ms) | 86400000 |
| `CORS_ORIGINS` | Allowed CORS origins | localhost:3000,5173 |

### Frontend

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | API base URL | /api |

## API Overview

### Authentication

```
POST /api/auth/register    - Register new user
POST /api/auth/login       - Login user
```

### Applications

```
GET    /api/applications           - List all applications
GET    /api/applications/{id}      - Get application details
POST   /api/applications           - Create application
PUT    /api/applications/{id}      - Update application
PATCH  /api/applications/{id}/status - Update status
DELETE /api/applications/{id}     - Delete application
```

### Interviews

```
GET    /api/interviews             - List all interviews
GET    /api/interviews/{id}        - Get interview details
POST   /api/interviews             - Schedule interview
PUT    /api/interviews/{id}        - Update interview
PATCH  /api/interviews/{id}/feedback - Add feedback
DELETE /api/interviews/{id}        - Delete interview
```

### Reminders

```
GET    /api/reminders              - List all reminders
POST   /api/reminders              - Create reminder
PUT    /api/reminders/{id}         - Update reminder
PATCH  /api/reminders/{id}/complete - Mark complete
DELETE /api/reminders/{id}         - Delete reminder
```

### Dashboard

```
GET    /api/dashboard              - Get dashboard stats
GET    /api/statuses               - List all statuses
```

### Companies

```
GET    /api/companies/search?q=    - Search companies
POST   /api/companies              - Create company
```

## Default Application Statuses

The application initializes with these statuses:

1. **Wishlist** - Jobs you're interested in
2. **Applied** - Application submitted
3. **Phone Screen** - Phone screening stage
4. **Technical Interview** - Technical assessment
5. **Onsite** - On-site interview
6. **Offer** - Job offer received
7. **Rejected** - Application rejected

## Deployment

### Backend (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `./mvnw package -DskipTests`
4. Set start command: `java -jar target/job-tracker-0.0.1-SNAPSHOT.jar`
5. Add environment variables for database and JWT

### Frontend (Vercel)

1. Create a new project on Vercel
2. Connect your GitHub repository
3. Set root directory: `frontend`
4. Set build command: `npm run build`
5. Set output directory: `dist`
6. Add environment variable: `VITE_API_BASE_URL=/api`

## Future Improvements

- [ ] Email notifications for reminders
- [ ] Calendar integration (Google Calendar, Outlook)
- [ ] Resume/CV upload functionality
- [ ] Analytics and reporting charts
- [ ] Multiple user collaboration
- [ ] Export data to PDF/CSV

## License

MIT License - feel free to use this project for learning and personal projects.

## Screenshots

*Coming soon*

---

Built with ❤️ for job seekers everywhere
