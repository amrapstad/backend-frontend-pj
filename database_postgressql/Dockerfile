# Use official postgres as base
FROM postgres:16

# Optional: Set default environment variables
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=password123
ENV POSTGRES_DB=postgresdb

# Copy init scripts to populate the database
COPY init.sql /docker-entrypoint-initdb.d/