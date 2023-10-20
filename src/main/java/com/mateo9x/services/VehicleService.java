package com.mateo9x.services;

import com.mateo9x.entities.Vehicle;
import com.mateo9x.repositories.VehicleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class VehicleService {

    private final VehicleRepository vehicleRepository;
    private final UserService userService;

    public Vehicle saveVehicle(Vehicle vehicleRequest) {
        Vehicle vehicleSaved = vehicleRepository.save(vehicleRequest);
        userService.addVehicleToLoggedUser(vehicleSaved);
        return vehicleSaved;
    }
}
