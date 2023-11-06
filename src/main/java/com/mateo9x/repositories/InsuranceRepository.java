package com.mateo9x.repositories;

import com.mateo9x.entities.Insurance;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface InsuranceRepository extends MongoRepository<Insurance, String> {
    List<Insurance> findAllByVehicleId(String id);

    @Query(value = "{'$and': [{'dateFrom': {$gte: ?0}}, {'dateTo': {$lte: ?1}}]}")
    Optional<Insurance> findByDatesBetween(LocalDate dateFrom, LocalDate dateTo);

}
