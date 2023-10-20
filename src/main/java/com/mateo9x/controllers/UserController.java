package com.mateo9x.controllers;

import com.mateo9x.entities.User;
import com.mateo9x.exceptions.UserExistsException;
import com.mateo9x.services.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        log.info("REST request to save user: {}", user);
        if (userService.getUserByEmail(user.getEmail()).isPresent()) {
            throw new UserExistsException("Użytkownik z podanym adresem email istnieje!");
        }
        return ResponseEntity.ok(userService.saveUser(user));
    }

}
