package com.mateo9x.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mateo9x.services.VehicleCoordinateService;
import lombok.AllArgsConstructor;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@AllArgsConstructor
public class NotifyWebSocketHandler extends TextWebSocketHandler {
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();
    private final VehicleCoordinateService coordinateService;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        for (int i = 0; i < 1000; i++) {
            TextMessage message = new TextMessage(objectMapper.writeValueAsString(
                    coordinateService.getVehicleCoordinatesGrouped()));
            session.sendMessage(message);
            Thread.sleep(30000); // 30 seconds
        }
        sessions.add(session);
    }
}
