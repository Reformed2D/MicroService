# Use the OpenJDK 17 base image
FROM openjdk:17-jdk-alpine

# Install curl for health check
RUN apk add --no-cache curl

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file into the container
COPY target/api-gateway-0.0.1-SNAPSHOT.jar app.jar

# Expose the port the app runs on
EXPOSE 8085

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:8085/actuator/health || exit 1

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]