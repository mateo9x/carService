package com.mateo9x.services;

import com.mateo9x.entities.User;
import com.mateo9x.entities.UserPreferences;
import com.mateo9x.repositories.UserPreferencesRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserPreferencesService {

    private final UserPreferencesRepository userPreferencesRepository;
    private final UserService userService;

    public UserPreferences savePreferences(UserPreferences userPreferences) {
        if (userPreferences.getId() == null) {
            Optional<User> userOptional = userService.getUserLogged();
            userOptional.ifPresent(user -> userPreferences.setUserId(user.getId()));
        }
        return userPreferencesRepository.save(userPreferences);
    }

    public UserPreferences getUserPreferencesForUserLogged() {
        Optional<User> userOptional = userService.getUserLogged();
        return userOptional.flatMap(user -> userPreferencesRepository.findByUserId(user.getId())).orElse(null);
    }

    public UserPreferences getUserPreferencesByUserId(String userId) {
        return userPreferencesRepository.findByUserId(userId).orElse(null);
    }
}
