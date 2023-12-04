package com.mateo9x.repositories;

import com.mateo9x.entities.SchedulerEvent;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface SchedulerEventRepository extends MongoRepository<SchedulerEvent, String> {

    @Query(value = "{'$and': [{'day': {$gte: ?0}}, {'day': {$lte: ?1}}]}")
    List<SchedulerEvent> findByDatesBetween(LocalDate dateFrom, LocalDate dateTo);

    @Query(value = "{'$and': [{'day': {$gte: ?0}}, {'vehicleId': ?1}]}")
    List<SchedulerEvent> findAllByDateAndVehicleId(LocalDate date, String vehicleId);
}
