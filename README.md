# Job Application Tracker

A full-stack web application for managing your job search process. Track applications, interviews, and reminders in one place.

## Tech Stack

**Backend:**
- Java 17
- Spring Boot 3.2
- Spring Data JPA
- MySQL
- Spring Security

**Frontend:**
- React 18
- Vite
- React Router
- Axios

## Features

- User authentication (Register/Login)
- Track job applications with status management
- Schedule and manage interviews
- Set reminders for follow-ups
- Dashboard with application statistics
- Filter applications by status

## Getting Started

### Prerequisites

- Java 17+
- Node.js 16+
- MySQL 8.0+

### Database Setup

1. Create a MySQL database:
```sql
CREATE DATABASE job_tracker;
```

2. Update `backend/src/main/resources/application.properties` with your MySQL credentials:
```properties
spring.datasource.username=root
spring.datasource.password=your_password
```

### Backend

```bash
cd backend
# If using system Maven:
mvn spring-boot:run

# Or use downloaded Maven:
./apache-maven-3.9.5/bin/mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:3000`

### Demo Account

The application creates a default user on first startup:
- Email: `demo@example.com`
- Password: `password123`

## Default Application Statuses

- Wishlist
- Applied
- Phone Screen
- Technical Interview
- Onsite
- Offer
- Rejected

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login

### Applications
- `GET /api/applications` - Get all applications
- `GET /api/applications/{id}` - Get application by ID
- `POST /api/applications` - Create application
- `PUT /api/applications/{id}` - Update application
- `PATCH /api/applications/{id}/status` - Update status
- `DELETE /api/applications/{id}` - Delete application

## Project Structure

```
job-application-tracker/
├── backend/
│   └── src/main/java/com/jobtracker/
│       ├── config/        # Configuration classes
│       ├── controller/   # REST controllers
│       ├── dto/           # Data Transfer Objects
│       ├── entity/        # JPA entities
│       ├── exception/     # Exception handlers
│       ├── repository/    # JPA repositories
│       └── service/       # Business logic
└── frontend/
    └── src/
        ├── components/   # React components
        ├── pages/         # Page components
        ├── routes/        # Route definitions
        └── services/      # API services
```

## License

MIT License
