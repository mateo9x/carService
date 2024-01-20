package com.mateo9x.services;

import com.mateo9x.entities.User;
import com.mateo9x.entities.Vehicle;
import com.mateo9x.entities.VehicleCoordinate;
import com.mateo9x.repositories.VehicleCoordinateRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class VehicleCoordinateService {

    private final VehicleCoordinateRepository repository;
    private final UserService userService;

    public VehicleCoordinate saveVehicleCoordinate(VehicleCoordinate vehicleCoordinate) {
        return repository.save(vehicleCoordinate);
    }

    public Map<String, List<VehicleCoordinate>> getVehicleCoordinatesGrouped() {
        Optional<User> userOptional = userService.getUserLogged();
        List<String> userVehicleIds = new ArrayList<>();
        userOptional.ifPresent(user -> userVehicleIds.addAll(user.getVehicles().stream()
                .map(Vehicle::getId)
                .toList()));
        return repository.findAll().stream()
                .filter(vehicleCoordinate -> userVehicleIds.contains(vehicleCoordinate.getVehicleId()))
                .sorted(Comparator.comparing(VehicleCoordinate::getTime, Comparator.reverseOrder()))
                .collect(Collectors.groupingBy(VehicleCoordinate::getVehicleId));
    }
}
