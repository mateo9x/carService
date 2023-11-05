package com.mateo9x.services;

import com.mateo9x.entities.User;
import com.mateo9x.entities.Vehicle;
import com.mateo9x.repositories.VehicleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
public class VehicleService {

    private final VehicleRepository vehicleRepository;
    private final UserService userService;

    @Transactional
    public Vehicle saveVehicle(Vehicle vehicleRequest) {
        Vehicle vehicleSaved = vehicleRepository.save(vehicleRequest);
        userService.addVehicleToLoggedUser(vehicleSaved);
        return vehicleSaved;
    }

    public Vehicle updateVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public List<Vehicle> getMyVehicles() {
        List<Vehicle> vehicles = new ArrayList<>();
        Optional<User> userOptional = userService.getUserLogged();
        userOptional.ifPresent(user -> getUserVehicles(vehicles, user));
        return vehicles;
    }

    public void deleteVehicle(String id) {
        vehicleRepository.deleteById(id);
    }

    private void getUserVehicles(List<Vehicle> vehicles, User user) {
        vehicles.addAll(user.getVehicles().stream().filter(Objects::nonNull).toList());
    }
}
