package com.mateo9x.services;

import com.mateo9x.entities.VehicleCoordinate;
import com.mateo9x.repositories.VehicleCoordinateRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class VehicleCoordinateService {

    private final VehicleCoordinateRepository repository;

    @Transactional
    public VehicleCoordinate saveVehicleCoordinate(VehicleCoordinate vehicleCoordinate) {
        return repository.save(vehicleCoordinate);
    }
}
