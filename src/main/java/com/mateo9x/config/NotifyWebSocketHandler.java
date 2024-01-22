package com.mateo9x.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.mateo9x.authentication.AuthenticatedUser;
import com.mateo9x.authentication.CarServiceUserDetailsService;
import com.mateo9x.authentication.JwtService;
import com.mateo9x.services.VehicleCoordinateService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
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
    private final JwtService jwtService;
    private final CarServiceUserDetailsService carServiceUserDetailsService;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        authenticate(session);
        objectMapper.registerModule(new JavaTimeModule());
        for (int i = 0; i < 1000; i++) {
            TextMessage message = new TextMessage(objectMapper.writeValueAsString(
                    coordinateService.getVehicleCoordinatesGrouped()));
            session.sendMessage(message);
            Thread.sleep(30000); // 30 seconds
        }
        sessions.add(session);
    }

    private void authenticate(WebSocketSession session) {
        String jwt = jwtService.getJwtTokenFromWebSocketSession(session);
        Jws<Claims> claimsJws = jwtService.validateJwt(jwt);
        if (claimsJws != null) {
            authenticate(claimsJws);
        }
    }

    private void authenticate(Jws<Claims> claimsJws) {
        String username = claimsJws.getBody().getSubject();
        AuthenticatedUser authenticatedUser = carServiceUserDetailsService.loadUserByUsername(username);
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = UsernamePasswordAuthenticationToken.authenticated(authenticatedUser, authenticatedUser.getPassword(), authenticatedUser.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
    }
}
