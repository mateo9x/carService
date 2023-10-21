package com.mateo9x.config;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.validation.annotation.Validated;

@Configuration
@Validated
@Data
@PropertySource("classpath:application.properties")
public class AppProperties {

    @NotNull
    @Value("${car-service.app-url}")
    private String appUrl;

}