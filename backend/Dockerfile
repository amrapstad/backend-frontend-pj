# Stage 1: Build
FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG TARGETARCH
 
WORKDIR /source
 
# Restore dependencies first
COPY *.csproj .
RUN dotnet restore -a $TARGETARCH
 
# Copy source and publish
COPY . .
RUN dotnet publish -a $TARGETARCH --no-restore -c Release -o /app
 
# Stage 2: Run
FROM mcr.microsoft.com/dotnet/aspnet:9.0
 
WORKDIR /app
COPY --from=build /app .
 
# Listen on HTTP only (terminate TLS at the load balancer / reverse proxy)
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production
 
EXPOSE 8080
 
# Run as non-root user
USER $APP_UID
 
ENTRYPOINT ["dotnet", "backend.dll"]