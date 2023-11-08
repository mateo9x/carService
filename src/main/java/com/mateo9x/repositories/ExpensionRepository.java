package com.mateo9x.repositories;

import com.mateo9x.entities.Expension;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ExpensionRepository extends MongoRepository<Expension, String> {

    List<Expension> findAllByVehicleId(String vehicleId);
}
