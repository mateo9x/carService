package com.mateo9x.controllers;

import com.mateo9x.authentication.AuthenticatedUser;
import com.mateo9x.authentication.AuthenticationFacade;
import com.mateo9x.authentication.AuthenticationRequest;
import com.mateo9x.authentication.JwtService;
import com.mateo9x.controllers.response.JwtTokenResponse;
import com.mateo9x.dtos.UserDto;
import com.mateo9x.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationFacade authenticationFacade;

    @PostMapping("/authenticate")
    public ResponseEntity<JwtTokenResponse> authenticate(@RequestBody AuthenticationRequest request) {
        log.info("REST request to authenticate: {}", request);
        return ResponseEntity.ok(authenticationFacade.authenticate(request));
    }

    @GetMapping("/user-logged")
    public ResponseEntity<UserLoggedResponse> getUserLogged() {
        log.info("REST request to get user logged");
        AuthenticatedUser authenticatedUser = AuthenticationFacade.getCurrentUser();
        if (authenticatedUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        UserDto user = this.userService.getUserByEmail(AuthenticationFacade.getCurrentUser().getUsername());
        Set<String> authorities = AuthenticationFacade.getCurrentUser().getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toSet());
        return ResponseEntity.ok(UserLoggedResponse.of(user, authorities));
    }

    @PostMapping("/invalidate")
    public ResponseEntity<?> invalidate(HttpServletRequest httpServletRequest) {
        log.info("REST request to invalidate");
        String jwt = jwtService.getJwtTokenFromHeader(httpServletRequest);
        jwtService.invalidate(jwt);
        return ResponseEntity.ok().build();
    }

    @Value(staticConstructor = "of")
    private static class UserLoggedResponse {
        UserDto user;
        Set<String> authorities;
    }

}
