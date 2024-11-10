FROM openjdk:17
WORKDIR /app
EXPOSE 8083
COPY target/companies-0.0.1.jar companies.jar
ENTRYPOINT ["java", "-jar", "companies.jar"]