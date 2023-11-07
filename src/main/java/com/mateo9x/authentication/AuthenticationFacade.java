package com.mateo9x.authentication;

import com.mateo9x.controllers.response.JwtTokenResponse;
import com.mateo9x.entities.UserAuthentication;
import com.mateo9x.services.UserAuthenticationService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Optional;

@AllArgsConstructor
@Component
public class AuthenticationFacade {

    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserAuthenticationService userAuthenticationService;

    public AuthenticatedUser getCurrentUser() {
        return Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication())
                .filter(authentication -> !(authentication instanceof AnonymousAuthenticationToken))
                .map(Authentication::getPrincipal)
                .map(AuthenticatedUser.class::cast)
                .orElse(null);
    }

    public JwtTokenResponse authenticate(AuthenticationRequest request) {
        Authentication authentication = authenticationManager.authenticate(request.getEmail(), request.getPassword());
        AuthenticatedUser authenticatedUser = (AuthenticatedUser) authentication.getPrincipal();
        String userId = authenticatedUser.getId();
        long daysSinceLastAuthentication = userAuthenticationService.getUserAuthenticationLoggedTimeInDays(userId);
        userAuthenticationService.saveUserAuthentication(UserAuthentication.builder()
                .authenticationDateTime(LocalDateTime.now())
                .userId(userId)
                .build());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return JwtTokenResponse.of(jwtService.createJwt(authenticatedUser), daysSinceLastAuthentication);
    }
}
