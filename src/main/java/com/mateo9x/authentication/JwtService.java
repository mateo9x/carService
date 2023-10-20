package com.mateo9x.authentication;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.CompressionCodecs;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public final class JwtService {
    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String BEARER = "Bearer ";
    private static final Key KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private static final Long EXPIRATION_TIME = 86400000L;
    private static final String ISSUER = "jwt";

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

    public String getJwtToken(HttpServletRequest httpServletRequest) {
        return Optional.ofNullable(httpServletRequest.getHeader(AUTHORIZATION_HEADER))
                .filter(header -> header.startsWith(BEARER))
                .map(header -> header.substring(BEARER.length()))
                .orElse(null);
    }
}