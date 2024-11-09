    package com.micro.getaway;

    import org.springframework.boot.SpringApplication;
    import org.springframework.boot.autoconfigure.SpringBootApplication;
    import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
    import org.springframework.cloud.gateway.route.RouteLocator;
    import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
    import org.springframework.context.annotation.Bean;
    import org.springframework.web.reactive.config.CorsRegistry;
    import org.springframework.web.reactive.config.EnableWebFlux;
    import org.springframework.web.reactive.config.WebFluxConfigurer;

    @SpringBootApplication
    @EnableDiscoveryClient
    @EnableWebFlux
    public class GetawayApplication {
        public static void main(String[] args) {
            SpringApplication.run(GetawayApplication.class, args);
        }


        @Bean
        public RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {
            return builder.routes()
                    .route("complaints-service", r -> r
                            .path("/api/complaint/**")
                            .uri("http://localhost:8082"))
                    .build();
        }}
