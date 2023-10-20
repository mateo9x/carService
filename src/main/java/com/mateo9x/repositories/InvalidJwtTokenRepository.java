package com.mateo9x.repositories;


import com.mateo9x.entities.InvalidJwtToken;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InvalidJwtTokenRepository extends MongoRepository<InvalidJwtToken, String> {
}
