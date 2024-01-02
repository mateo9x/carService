package com.mateo9x.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import static java.util.Arrays.asList;

public class NotifyWebSocketHandler extends TextWebSocketHandler {
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        for (int i = 0; i < 1000; i++) {
            TextMessage message = new TextMessage(objectMapper.writeValueAsString(asList("elo", "elo2")));
            session.sendMessage(message);
            Thread.sleep(30000); // 30 seconds
        }
        sessions.add(session);
    }
}
