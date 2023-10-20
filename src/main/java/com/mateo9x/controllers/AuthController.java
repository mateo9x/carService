package com.mateo9x.controllers;

import com.mateo9x.authentication.AuthenticatedUser;
import com.mateo9x.authentication.AuthenticationFacade;
import com.mateo9x.authentication.AuthenticationRequest;
import com.mateo9x.authentication.JwtService;
import com.mateo9x.controllers.response.JwtTokenResponse;
import com.mateo9x.entities.User;
import com.mateo9x.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.GrantedAuthority;

import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationFacade authenticationFacade;

    @PostMapping("/authenticate")
    public ResponseEntity<JwtTokenResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationFacade.authenticate(request));
    }

    @GetMapping("/user-logged")
    public ResponseEntity<UserLoggedResponse> getUserLogged() {
        AuthenticatedUser authenticatedUser = authenticationFacade.getCurrentUser();
        if (authenticatedUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        User user = this.userService.getUserByEmail(authenticationFacade.getCurrentUser().getUsername()).orElse(null);
        Set<String> authorities = this.authenticationFacade.getCurrentUser().getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toSet());
        return ResponseEntity.ok(UserLoggedResponse.of(user, authorities));
    }

    @PostMapping("/invalidate")
    public ResponseEntity<?> invalidate(HttpServletRequest httpServletRequest)
    {
        String jwt = jwtService.getJwtToken(httpServletRequest);
        jwtService.invalidate(jwt);
        return ResponseEntity.ok().build();
    }

    @Value(staticConstructor = "of")
    private static class UserLoggedResponse {
         User user;
         Set<String> authorities;
    }

}
