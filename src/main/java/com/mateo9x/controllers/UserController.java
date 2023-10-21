package com.mateo9x.controllers;

import com.mateo9x.dtos.UserDto;
import com.mateo9x.entities.User;
import com.mateo9x.exceptions.UserExistsException;
import com.mateo9x.services.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
    public ResponseEntity<UserDto> saveUser(@RequestBody User user) {
        log.info("REST request to save user: {}", user);
        if (userService.isUserByEmailPresent(user.getEmail())) {
            throw new UserExistsException("Użytkownik z podanym adresem email istnieje!");
        }
        return ResponseEntity.ok(userService.saveUser(user));
    }

    @PutMapping("/update-password")
    public ResponseEntity<?> updatePassword(@RequestBody String password) {
        log.info("REST request to update password");
        userService.updatePassword(password);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/reset-password/email/{email}")
    public ResponseEntity<?> startResetPasswordProcedure(@PathVariable String email) {
        log.info("REST request to start reset password procedure for email: {}", email);
        userService.startResetPasswordProcedure(email);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/reset-password/token/{token}/valid")
    public ResponseEntity<Boolean> isResetPasswordTokenValid(@PathVariable String token) {
        log.info("REST request to check if reset password token is valid");
        return ResponseEntity.ok(userService.isResetPasswordTokenValid(token));
    }

    @PatchMapping("/reset-password/token/{token}/finish")
    public ResponseEntity<?> finishResetPasswordProcedure(@PathVariable String token, @RequestBody String password) {
        log.info("REST request to finish reset password procedure");
        userService.finishResetPasswordProcedure(token, password);
        return ResponseEntity.noContent().build();
    }
}
