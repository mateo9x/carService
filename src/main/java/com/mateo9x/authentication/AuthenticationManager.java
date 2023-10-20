package com.mateo9x.authentication;

import lombok.AllArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class AuthenticationManager {
    private final CarServiceUserDetailsService carServiceUserDetailsService;
    private final PasswordEncoder passwordEncoder;

    public Authentication authenticate(String email, String password) {
        AuthenticatedUser authenticatedUser = carServiceUserDetailsService.loadUserByUsername(email);
        if (!passwordEncoder.matches(password, authenticatedUser.getPassword())) {
            throw new BadCredentialsException("");
        }
        return UsernamePasswordAuthenticationToken.authenticated(authenticatedUser, email, authenticatedUser.getAuthorities());
    }
}