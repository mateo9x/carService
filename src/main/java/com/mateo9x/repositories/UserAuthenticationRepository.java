package com.mateo9x.repositories;

import com.mateo9x.entities.UserAuthentication;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserAuthenticationRepository extends MongoRepository<UserAuthentication, String> {
    List<UserAuthentication> findAllByUserId(String userId);
}
