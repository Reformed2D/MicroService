# Use a base image with Java runtime
FROM openjdk:17-jdk-slim

# Install curl for health check
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy the jar file into the container
COPY target/eureka-server-0.0.1-SNAPSHOT.jar eureka-server.jar

# Expose the port Eureka Server listens on
EXPOSE 8762

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:8762/actuator/health || exit 1

# Set the entrypoint to run the jar
ENTRYPOINT ["java", "-jar", "eureka-server.jar"]