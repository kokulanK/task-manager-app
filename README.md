<<<<<<< HEAD
#  Task Manager Application

    A full‑stack task management application with **Spring Boot** backend, **Angular** frontend, **MySQL** database, and **JWT** authentication. The project is fully containerized with **Docker Compose** for easy setup and deployment.

  ##  🚀 Features

    - **User Authentication** – Register, login, and JWT‑based session management.
    - **Task Management** – Create, read, update, delete tasks with priority (HIGH / MEDIUM / LOW) and status (TO_DO / IN_PROGRESS / DONE).
    - **Smart Sorting** – Tasks are grouped by status (In Progress → To Do → Done) and sorted by priority within each group.
    - **Inline Updates** – Change task status or priority directly from the task list.
    - **Search & Filters** – Search by title, filter by status and priority.
    - **User Profile** – Update name and password, delete account.
    - **Responsive UI** – Clean, modern design that works on desktop, tablet, and mobile.
    - **Dockerized** – Run the entire stack with a single `docker-compose up` command.
  ##  🛠️ Tech Stack

    | Layer          | Technologies                                                 |
    |----------------|--------------------------------------------------------------|
    | **Backend**    | Spring Boot 3.1, Spring Security, JWT, Spring Data JPA, MySQL|
    | **Frontend**   | Angular 17, Bootstrap 5, RxJS                                |
    | **Database**   | MySQL 8                                                      |
    | **Container**  | Docker, Docker Compose                                       |
  ##  📁 Project Structure

    task-manager/
    ├── backend/ # Spring Boot application
    │ ├── src/
    │ │ ├── main/java/... # Controllers, services, repositories, entities, config
    │ │ └── resources/ # application.properties
    │ ├── Dockerfile
    │ └── pom.xml
    ├── frontend/ # Angular application
    │ ├── src/
    │ │ ├── app/ # Components, services, models, guards, interceptors
    │ │ ├── environments/ # API URLs
    │ │ └── index.html
    │ ├── Dockerfile
    │ ├── nginx.conf
    │ ├── angular.json
    │ └── package.json
    ├── docker-compose.yml # Orchestrates all three services
    └── README.md
    
  ##  ✅ Prerequisites

    - [Docker](https://www.docker.com/products/docker-desktop/) (with Docker Compose)
    - (Optional) [Node.js](https://nodejs.org/) and [Java 17](https://adoptium.net/) for local development
    
  ##  🐳 Running with Docker (Recommended)

    1. Clone the repository  
       ```bash
       git clone https://github.com/your-username/task-manager.git
       cd task-manager
    Start the containers
    
    docker-compose up -d --build
    
    This will build and run the backend (Spring Boot on port 8087), frontend (Angular served by Nginx on port 8080), and MySQL (port 3307).
    Access the application
    
    Frontend: http://localhost:8080
    
    Backend API: http://localhost:8087/api
    Stop the containers
    
    docker-compose down
    
  ##  🖥️ Local Development (Without Docker)

    Backend (Spring Boot)

      Install Java 17 and Maven

      Configure MySQL – Create a database named taskdb and update application.properties if needed.
      Run the application

        cd backend
        mvn spring-boot:run

    The API will be available at http://localhost:8087/api.
    Frontend (Angular)

    Install Node.js (v18+) and npm

    Install dependencies

      cd frontend
      npm install
    Start the development server

    npm start

    The app will open at http://localhost:4200. The proxy configuration forwards API calls to http://localhost:8087.
    
  ##  📡 API Endpoints

    All endpoints are prefixed with /api. Protected endpoints require a Bearer Token in the Authorization header.

    Method      Endpoint	              Description	              Auth
    
    POST	      /auth/register	        Register a new user	      No
    POST	      /auth/login	            Login and get JWT	        No
    GET	        /tasks	                Get all tasks of user	    Yes
    POST	      /tasks	                Create a task	            Yes
    PUT	        /tasks/{id}	            Update a task	            Yes
    DELETE	    /tasks/{id}	            Delete a task	            Yes
    GET	        /user/profile	          Get user profile	        Yes
    PUT	        /user/profile	          Update profile	          Yes
    DELETE	    /user/account	          Delete account	          Yes

  ##  🔐 JWT Authentication Flow

    User registers with name, email, and password.
    
    User logs in – backend validates credentials and returns a JWT token.
    
    The frontend stores the token in localStorage and attaches it to every subsequent request via an HTTP interceptor.
    
    The backend validates the token on each protected request using a custom JwtAuthenticationFilter.
    
    Token expiry is set to 24 hours.
    
  ##  🎨 Screenshots

Register Page

<img src="https://github.com/user-attachments/assets/e2097651-7eea-4c08-ad2e-a1e7627037c7" width="800" /><br>

Login Page

<img src="https://github.com/user-attachments/assets/a7cb2e4b-e84a-4f1c-9513-a2c733aca2f7" width="800" /><br>


Task Page 1

<img src="https://github.com/user-attachments/assets/733c6289-e788-49fb-bca3-fd96a939b33e" width="800" /><br>

Task Page 2

<img src="https://github.com/user-attachments/assets/2e5dc7b8-fd2a-45bc-b7b2-913dee65a686" width="800" /><br>

Profile Page

<img src="https://github.com/user-attachments/assets/56db84d3-2e53-4124-81d0-e828cce2eb64" width="800" /><br>

  ##  📊 Database Schema

    The database consists of two main tables:

      users
      
      id (PK)
      
      name
      
      email (unique)
      
      password (BCrypt encoded)
      
      tasks
      
      id (PK)
      
      title
      
      description
      
      status (ENUM: TO_DO, IN_PROGRESS, DONE)
      
      priority (ENUM: LOW, MEDIUM, HIGH)
      
      user_id (FK referencing users.id)
  
  ##  🧪 Testing

    Backend
    
    Run unit/integration tests with:
    
      cd backend
      
      mvn test
    
    Frontend
    
    Run unit tests with:
    
      cd frontend
      
      npm test

  ##  📝 Code Quality

    Backend: Follows standard Spring Boot architecture (Controller → Service → Repository). Uses DTOs, validation annotations, and a global exception handler.
    
    Frontend: Modular components, reactive forms, services with HTTP interceptors, and guards for route protection.
    
    Both: Clean, consistent naming, and comments where necessary.
  ##  🐞 Troubleshooting

    Container fails to start – Ensure ports 8080, 8087, and 3307 are free.
    
    Backend cannot connect to MySQL – Verify the SPRING_DATASOURCE_URL in docker-compose.yml uses the service name db.
    
    CORS errors – Check that the backend's CorsConfiguration includes the frontend's origin (http://localhost:4200 or http://localhost:8080).

  ##  📚 Additional Resources
    
    Spring Boot Documentation - https://spring.io/projects/spring-boot
    
    Angular Documentation - https://v17.angular.io/docs
    
    JWT.io - https://www.jwt.io/
    
    Docker Compose - https://docs.docker.com/compose/

  ##  🤝 Contributing

    Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
    Built by

    Kokulan Kugathasan
    📞 +94 76 752 0033
    ✉️ kokulankugathasan2003@gmail.com
    🔗 linkedin.com/in/kokulan-kugathasan
=======
version: '3.8'

services:
  db:
    image: mysql:8.0
    container_name: taskmanager-db
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: taskmanager
    ports:
      - "3307:3306"  # Map to different host port to avoid conflict if local MySQL runs
    volumes:
      - db_data:/var/lib/mysql
    networks:
      - taskmanager-net
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      timeout: 20s
      retries: 10

  backend:
    build: ./backend
    container_name: taskmanager-backend
    ports:
      - "8087:8080"   # Host port 8087 maps to container port 8080
    depends_on:
      db:
        condition: service_healthy
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://db:3306/taskmanager?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
      SPRING_DATASOURCE_USERNAME: root
      SPRING_DATASOURCE_PASSWORD: rootpassword
    networks:
      - taskmanager-net

  frontend:
    build: ./frontend
    container_name: taskmanager-frontend
    ports:
      - "4200:80"   # Access frontend at http://localhost:4200
    depends_on:
      - backend
    networks:
      - taskmanager-net

volumes:
  db_data:

networks:
  taskmanager-net:
    driver: bridge
>>>>>>> 972fb40 (Initial commit: added backend and frontend project structure)
