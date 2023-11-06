package com.mateo9x.repositories;

import com.mateo9x.entities.Inspection;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface InspectionRepository extends MongoRepository<Inspection, String> {
    List<Inspection> findAllByVehicleId(String vehicleId);
    Optional<Inspection> findByDate(LocalDate date);

}
