package com.mateo9x.controllers;

import com.mateo9x.entities.UserPreferences;
import com.mateo9x.services.UserPreferencesService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/user-preferences")
@AllArgsConstructor
public class UserPreferencesController {

    private final UserPreferencesService userPreferencesService;

    @PostMapping
    public ResponseEntity<UserPreferences> saveUserPreferences(@RequestBody UserPreferences userPreferences) {
        log.info("REST request to save user preferences: {}", userPreferences);
        return ResponseEntity.ok(userPreferencesService.savePreferences(userPreferences));
    }

    @PutMapping
    public ResponseEntity<UserPreferences> updateUserPreferences(@RequestBody UserPreferences userPreferences) {
        log.info("REST request to updateU user preferences: {}", userPreferences);
        return ResponseEntity.ok(userPreferencesService.savePreferences(userPreferences));
    }

    @GetMapping("/user-logged")
    public ResponseEntity<UserPreferences> getUserPreferencesForUserLogged() {
        log.info("REST request to get user preferences for user logged");
        return ResponseEntity.ok(userPreferencesService.getUserPreferencesForUserLogged());
    }

}
