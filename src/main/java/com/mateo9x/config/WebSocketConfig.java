package com.mateo9x.config;

import com.mateo9x.services.VehicleCoordinateService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
@AllArgsConstructor
public class WebSocketConfig implements WebSocketConfigurer {

    private final VehicleCoordinateService vehicleCoordinateService;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(notifyWebSocketHandler(), "/notifies").setAllowedOrigins("*");
    }

    @Bean
    public WebSocketHandler notifyWebSocketHandler() {
        return new NotifyWebSocketHandler(vehicleCoordinateService);
    }
}