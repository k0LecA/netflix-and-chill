# Netflix and Chill

A full-stack web application for curating, managing, and browsing a personal collection of favorite movies.

## Technology Stack

### Frontend
- Core: React 19, TypeScript
- Build Tool: Vite
- Styling: Tailwind CSS, CSS
- Component Library: Radix UI, Shadcn UI, Bootstrap, React Bootstrap
- Icons: Lucide React

### Backend
- Core Framework: NestJS, TypeScript
- Object Relational Mapper (ORM): TypeORM
- Database: SQLite (via better-sqlite3)
- Validation: Class-validator, Class-transformer

## Project Structure

The project is structured as a monorepo consisting of distinct frontend and backend directories.

```text
netflix-and-chill/
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/           # Authentication controller, services, and decorators
│   │   │   ├── genres/         # Genre management controller and entities
│   │   │   └── movies/         # Movie management controller and entities
│   │   ├── app.module.ts       # Global app module and typeorm configuration
│   │   └── main.ts             # Application entry point, global filters, and bootstrap
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── api/                # API client abstraction layer
│   │   ├── components/         # Reusable React components (List, MovieCard, AddMovieModal)
│   │   ├── hooks/              # Custom React hooks (useMovies)
│   │   ├── App.css             # Main styling rules
│   │   └── main.tsx            # React application entry point
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
└── README.md
```

## Security Measures

The application implements robust, industry-standard security practices to protect data integrity and user sessions:

1. Global Guard Authentication: The backend operates on a secure-by-default architecture. An AuthGuard is registered globally. Every endpoint requires active session authentication unless explicitly declared with the Public decorator (such as registration and login routes).
2. HTTP-Only JWT Cookie: Authentication uses JSON Web Tokens (JWT). Rather than storing tokens in insecure browser storage (localStorage or sessionStorage) where they are vulnerable to Cross-Site Scripting (XSS), the token is delivered in a secure HTTP-Only cookie. This cookie has SameSite=Lax and is marked Secure in production environments.
3. Cryptographic Password Hashing: User passwords are encrypted prior to database insertion using bcryptjs with a salt round factor of 10. Direct plain text passwords are never stored or exposed.
4. Payload Validation: All incoming client payloads are validated at the NestJS boundary using a global ValidationPipe configured with whitelist and forbidNonWhitelisted rules. Invalid or unexpected parameters are blocked before execution.
5. Cross-Origin Resource Sharing (CORS): CORS is enabled dynamically with credential support, ensuring only authorized origins can perform cross-origin network operations.

## Installation and Setup

### Prerequisites
- Node.js (version 18 or above recommended)
- npm or pnpm package manager

### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the NestJS dev server:
   ```bash
   npm run start:dev
   ```
   The backend server will run on `http://localhost:3000`.

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```
   The frontend application will be hosted on `http://localhost:5173`. Vite is configured with a proxy to forward `/api` requests automatically to `http://localhost:3000`.

## API Endpoints

All backend endpoints are prefixed with `/api`.

### Authentication Endpoints (Base Path: `/api/auth`)

| Method | Endpoint | Description | Payload Constraints | Access |
|---|---|---|---|---|
| POST | `/api/auth/signup` | Registers a new user account | Email (valid format), Password (min length 6) | Public |
| POST | `/api/auth/signin` | Validates credentials and issues secure cookie | Email, Password | Public |
| POST | `/api/auth/signout` | Clears the auth_token cookie | None | Public |
| GET | `/api/auth/me` | Returns current logged-in user profile | None | Authenticated |

### Movies Endpoints (Base Path: `/api/movies`)

| Method | Endpoint | Description | Payload Constraints | Access |
|---|---|---|---|---|
| GET | `/api/movies` | Retrieves all movies in the list | None | Authenticated |
| GET | `/api/movies/:id` | Retrieves a specific movie by ID | ID (integer path param) | Authenticated |
| POST | `/api/movies` | Adds a new movie to the catalog | Name, Rating, Year, PosterUrl, Duration, GenreId | Authenticated |
| PATCH | `/api/movies/:id` | Modifies movie metadata | Partial movie fields | Authenticated |
| DELETE | `/api/movies/:id` | Deletes a movie from the database | ID (integer path param) | Authenticated |

### Genres Endpoints (Base Path: `/api/genres`)

| Method | Endpoint | Description | Payload Constraints | Access |
|---|---|---|---|---|
| GET | `/api/genres` | Lists all available movie genres | None | Authenticated |
| GET | `/api/genres/:id` | Retrieves a single genre by ID | ID (integer path param) | Authenticated |
| POST | `/api/genres` | Creates a new movie genre | Name | Authenticated |
| PATCH | `/api/genres/:id` | Updates an existing genre | Name | Authenticated |
| DELETE | `/api/genres/:id` | Deletes a genre from the database | ID (integer path param) | Authenticated |
