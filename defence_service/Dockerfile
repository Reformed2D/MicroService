# Use a base image with Java runtime
FROM openjdk:17-jdk-slim

# Install curl for health check
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy the jar file into the container
COPY target/defence_service-0.0.1-SNAPSHOT.jar defence_service.jar

# Expose the port the service listens on
EXPOSE 8081

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:8081/actuator/health || exit 1

# Set the entrypoint to run the jar
ENTRYPOINT ["java", "-jar", "defence_service.jar"]