# Boat Management Application

## Overview
This is a full-stack web application designed for managing boats, boat owners, and their purchase receipts. The application is fully containerized using Docker and consists of a React frontend, ASP.NET Core backend API, and a PostgreSQL database. It also currently features a automated deployment worflow to a live website through Hostinger VPS.

## Architecture & Technology Stack
- **Frontend**: React 19, Vite, and Base UI. Built and served via Nginx in a Docker container.
- **Backend**: C# ASP.NET Core 9.0 Web API using Entity Framework Core for data access.
- **Database**: PostgreSQL 17.
- **Infrastructure**: Docker & Docker Compose for orchestration.

## Features & Database Schema
The application manages the following primary entities:
- `boat_owner`: Stores boat owner details (name, email).
- `boat`: Stores boat details (name, model year).
- `boat_owner_receipt`: Keeps track of purchases, linking owners to boats with a purchase date.

*Note: The database is automatically seeded with sample data on its first initialization via the provided SQL scripts (`init.sql` and `populate_sql.sql`).*

## Prerequisites
- [Docker](https://docs.docker.com/get-docker/) installed.

## Automated Deployment

Developer merges a Pull Request into main branch on GitHub
       ↓
GitHub detects a push event on the main branch
       ↓
GitHub Actions spins up a fresh Ubuntu virtual machine (the "runner")
       ↓
The runner loads the 3 secrets (VPS_HOST, VPS_USER, VPS_SSH_KEY)
       ↓
appleboy/ssh-action uses the private SSH key to authenticate into the VPS
       ↓
GitHub Actions sends the deploy script over SSH to the VPS to execute
       ↓
VPS: deletes the old /root/app folder to ensure a clean slate
       ↓
VPS: git clone pulls the latest code from the main branch
       ↓
VPS: writes DB_USER and DB_PASSWORD into a .env file
      (secrets never stored in the repo, only exist at runtime)
       ↓
VPS: _docker compose up -d --build_
       ↓
Docker rebuilds the backend image, frontend and database (for now)
       ↓
GitHub Actions reports success or failure in the Actions tab
       ↓
**App is live with the latest changes at http://187.124.23.216**

## How to Run Locally

1. **Set up Environment Variables:**
   The `docker-compose.yml` relies on two environment variables for PostgreSQL configuration: `DB_USER` and `DB_PASSWORD`. 
   Create a `.env` file in the root directory (next to `docker-compose.yml`) and define them:
   ```env
   DB_USER=my_db_user
   DB_PASSWORD=my_secure_password
   ```

2. **Build and Start the Application:**
   Open a terminal in the root directory and run the following command to build the Docker images and start the services in the background:
   ```bash
   docker compose up --build
   ```

3. **Access the Services:**
   - **Web Application (Frontend)**: Open your browser and navigate to [http://localhost](http://localhost)
   - **Backend API**: The ASP.NET Core API is mapped to port `8080` and is accessible at [http://localhost:8080](http://localhost:8080)
   - **PostgreSQL Database**: Port `5432` is mapped to the host, allowing direct connection via `localhost:5432` using the credentials you defined in the `.env` file.

4. **Stop the Application:**
   To stop the running application and remove the containers, run:
   ```bash
   docker compose down -v
   ```

## Dev Containers
This project comes with dedicated Visual Studio Code Dev Containers to ensure a consistent development environment without needing to install the SDKs locally:
- **Backend Dev Container**: Located in `.devcontainer/backend_env`. It spins up a .NET 9 SDK environment with the necessary VS Code extensions for C# development. It forwards ports 5000 (HTTP) and 5001 (HTTPS).
- **Frontend Dev Container**: Located in `.devcontainer/frontend_env`. It sets up a Node 22 environment configured for Vite and React development. It forwards port 5173 for the Vite dev server.

## Development Structure
- `./frontend`: Contains the React/Vite web application. You can navigate into this directory and run `npm run dev` for local frontend development (assuming Node.js is installed).
- `./backend`: Contains the .NET 9 ASP.NET Core API.
- `./init.sql` & `./populate_sql.sql`: SQL scripts that run automatically when the PostgreSQL database container is first created.
