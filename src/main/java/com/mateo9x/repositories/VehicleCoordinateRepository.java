package com.mateo9x.repositories;

import com.mateo9x.entities.VehicleCoordinate;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface VehicleCoordinateRepository extends MongoRepository<VehicleCoordinate, String> {
}
