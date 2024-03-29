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
    private final ExpensionService expensionService;
    private final InspectionService inspectionService;
    private final InsuranceService insuranceService;

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

    @Transactional
    public void deleteVehicle(String id) {
        expensionService.deleteAllVehicleExpenses(id);
        insuranceService.deleteAllVehicleInsurances(id);
        inspectionService.deleteAllVehicleInspections(id);
        vehicleRepository.deleteById(id);
    }

    public String getVehicleFullNameByVehicleId(String vehicleId) {
        Optional<Vehicle> vehicleOptional = vehicleRepository.findById(vehicleId);
        return vehicleOptional.map(vehicle -> vehicle.getBrand() + " " + vehicle.getModel() + " (" + vehicle.getLicensePlate() + ")").orElse("");
    }

    public Vehicle getVehicleById(String vehicleId) {
        return vehicleRepository.findById(vehicleId).orElse(null);
    }

    public void setVehicleAsActive(String vehicleId) {
        List<Vehicle> myVehicles = getMyVehicles();
        myVehicles.stream()
                .filter(vehicle -> Boolean.TRUE.equals(vehicle.getActive()))
                .findFirst()
                .ifPresent(vehicle -> updateVehicleActiveStatus(vehicle, false));

        myVehicles.stream()
                .filter(vehicle -> vehicleId.equals(vehicle.getId()))
                .findFirst()
                .ifPresent(vehicle -> updateVehicleActiveStatus(vehicle, true));

    }

    private void getUserVehicles(List<Vehicle> vehicles, User user) {
        vehicles.addAll(user.getVehicles().stream().filter(Objects::nonNull).toList());
    }

    private void updateVehicleActiveStatus(Vehicle vehicle, boolean active) {
        vehicle.setActive(active);
        vehicleRepository.save(vehicle);
    }
}
