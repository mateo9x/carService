package com.mateo9x.authentication;

import com.mateo9x.entities.InvalidJwtToken;
import com.mateo9x.repositories.InvalidJwtTokenRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import java.net.URI;
import java.security.Key;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
@Slf4j
@AllArgsConstructor
public final class JwtService {
    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String WS_AUTHORIZATION_PARAMETER = "token";
    private static final String WS_AUTHORIZATION_QUERY = "token=";
    private static final String BEARER = "Bearer ";
    private static final Key KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private static final Long EXPIRATION_TIME = 86400000L;
    private static final String ISSUER = "jwt";

    private static final Map<String, BlackListedJwt> BLACK_LISTED_JWTS = new HashMap<>();
    private static ScheduledExecutorService BLACK_LISTED_JWTS_CLEARER_EXECUTOR_SERVICE = Executors.newSingleThreadScheduledExecutor();

    static {
        BLACK_LISTED_JWTS_CLEARER_EXECUTOR_SERVICE.scheduleAtFixedRate(JwtService::clearBlacklistedJwts, 1, 1, TimeUnit.HOURS);
    }

    private static void clearBlacklistedJwts() {
        for (final BlackListedJwt blackListedJwt : List.copyOf(BLACK_LISTED_JWTS.values())) {
            if (LocalDateTime.now().isAfter(blackListedJwt.getExpirationTime())) {
                BLACK_LISTED_JWTS.remove(blackListedJwt.getJwt());
            }
        }
    }

    private final InvalidJwtTokenRepository invalidJwtTokenRepository;

    @PostConstruct
    void initBlacklistedJwts() {
        invalidJwtTokenRepository.findAll().stream()
                .map(invalidJwtTokenEntity -> BlackListedJwt.of(invalidJwtTokenEntity.getJwt(), invalidJwtTokenEntity.getExpirationDateTime()))
                .forEach(blackListedJwt -> BLACK_LISTED_JWTS.put(blackListedJwt.getJwt(), blackListedJwt));
    }

    public String createJwt(AuthenticatedUser authenticatedUser) {
        Claims claims = Jwts.claims()
                .setSubject(authenticatedUser.getUsername())
                .setIssuer(ISSUER)
                .setNotBefore(Date.from(Instant.now()))
                .setIssuedAt(Date.from(Instant.now()))
                .setExpiration(Date.from(Instant.now().plus(Duration.ofSeconds(EXPIRATION_TIME))));

        claims.put("authorities", authenticatedUser.getAuthorities());

        return Jwts.builder()
                .setSubject(authenticatedUser.getUsername())
                .signWith(KEY)
                .compressWith(CompressionCodecs.DEFLATE)
                .setClaims(claims)
                .compact();
    }

    public Jws<Claims> validateJwt(String jwt) {
        if (BLACK_LISTED_JWTS.containsKey(jwt)) {
            throw new IllegalStateException();
        }
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(KEY)
                    .requireIssuer(ISSUER)
                    .build()
                    .parseClaimsJws(jwt);
        } catch (Exception exception) {
            log.error(exception.getMessage());
            throw exception;
        }
    }

    public String getJwtTokenFromHeader(HttpServletRequest httpServletRequest) {
        return Optional.ofNullable(httpServletRequest.getHeader(AUTHORIZATION_HEADER))
                .filter(header -> header.startsWith(BEARER))
                .map(header -> header.substring(BEARER.length()))
                .orElse(null);
    }

    public String getJwtTokenFromWebSocketUrl(HttpServletRequest httpServletRequest) {
        return httpServletRequest.getParameter(WS_AUTHORIZATION_PARAMETER);
    }

    public String getJwtTokenFromWebSocketSession(WebSocketSession session) {
        return Optional.ofNullable(session.getUri())
                .map(URI::getQuery)
                .filter(query -> query.startsWith(WS_AUTHORIZATION_QUERY))
                .map(header -> header.substring(WS_AUTHORIZATION_QUERY.length() ))
                .orElse(null);
    }

    public void invalidate(String jwt) {
        Jws<Claims> jws = validateJwt(jwt);
        Date exprationDate = jws.getBody().getExpiration();
        LocalDateTime expirationDateTime = exprationDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
        BLACK_LISTED_JWTS.put(jwt, BlackListedJwt.of(jwt, expirationDateTime));

        InvalidJwtToken invalidJwtToken = new InvalidJwtToken();
        try {
            invalidJwtToken.setJwt(jwt);
            invalidJwtToken.setInvalidatedDateTime(LocalDateTime.now());
            invalidJwtToken.setExpirationDateTime(expirationDateTime);
            invalidJwtTokenRepository.save(invalidJwtToken);
        } catch (Exception exception) {
            log.error("Could not save invalid jwt token entity: " + invalidJwtToken, exception);
        }
    }

    @Value(staticConstructor = "of")
    private static class BlackListedJwt {
        String jwt;
        LocalDateTime expirationTime;
    }
}