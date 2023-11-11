package com.mateo9x.repositories;

import com.mateo9x.entities.UserPreferences;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserPreferencesRepository extends MongoRepository<UserPreferences, String> {

    Optional<UserPreferences> findByUserId(String userId);
}
