package com.multicode.payments.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CORSConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedMethods("GET","POST","DELETE","PUT","OPTIONS")
                .allowedOrigins("*") //TODO - this should be a list of known servers, and should be in a config file
                .allowedHeaders("*");

    }
}
