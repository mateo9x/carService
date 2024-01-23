package com.mateo9x.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
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

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@AllArgsConstructor
public class NotifyWebSocketHandler extends TextWebSocketHandler {
    private static final ObjectMapper objectMapper = prepareObjectMapper();
    private final List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();
    private final VehicleCoordinateService coordinateService;
    private final JwtService jwtService;
    private final CarServiceUserDetailsService carServiceUserDetailsService;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        authenticate(session);
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

    private static ObjectMapper prepareObjectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        JavaTimeModule javaTimeModule = new JavaTimeModule();
        javaTimeModule.addDeserializer(LocalDateTime.class, new LocalDateTimeDeserializer(DateTimeFormatter.ISO_DATE_TIME));
        mapper.registerModule(javaTimeModule);
        mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        return mapper;
    }
}
