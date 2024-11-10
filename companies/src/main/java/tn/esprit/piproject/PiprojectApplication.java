package tn.esprit.piproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class PiprojectApplication {

    public static void main(String[] args) {
        SpringApplication.run(PiprojectApplication.class, args);
    }

}
