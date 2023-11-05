package com.mateo9x.repositories;

import com.mateo9x.entities.Insurance;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface InsuranceRepository extends MongoRepository<Insurance, String> {
    List<Insurance> findAllByVehicleId(String id);
}
