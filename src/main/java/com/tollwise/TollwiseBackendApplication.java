package com.tollwise;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.tollwise.entity")
@EnableJpaRepositories(basePackages = "com.tollwise.repository")
public class TollwiseBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(TollwiseBackendApplication.class, args);
    }
}