package com.mateo9x.services;

import com.mateo9x.entities.VehicleCoordinate;
import com.mateo9x.repositories.VehicleCoordinateRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class VehicleCoordinateService {

    private final VehicleCoordinateRepository repository;

    public VehicleCoordinate saveVehicleCoordinate(VehicleCoordinate vehicleCoordinate) {
        return repository.save(vehicleCoordinate);
    }

    public Map<String, List<VehicleCoordinate>> getVehicleCoordinatesGrouped() {
        return repository.findAll().stream()
                .sorted(Comparator.comparing(VehicleCoordinate::getTime, Comparator.reverseOrder()))
                .collect(Collectors.groupingBy(VehicleCoordinate::getVehicleId));
    }
}
