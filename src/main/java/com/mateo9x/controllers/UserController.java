package com.mateo9x.controllers;

import com.mateo9x.authentication.AuthenticatedUser;
import com.mateo9x.authentication.AuthenticationFacade;
import com.mateo9x.authentication.AuthenticationRequest;
import com.mateo9x.controllers.response.JwtTokenResponse;
import com.mateo9x.entities.User;
import com.mateo9x.exceptions.UserExistsException;
import com.mateo9x.services.UserService;
import lombok.AllArgsConstructor;
import lombok.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        if (userService.getUserByEmail(user.getEmail()).isPresent()) {
            throw new UserExistsException("Użytkownik z podanym adresem email istnieje!");
        }
        return ResponseEntity.ok(userService.saveUser(user));
    }

}
