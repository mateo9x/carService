package com.mateo9x.controllers;

import com.mateo9x.entities.Vehicle;
import com.mateo9x.services.VehicleService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/vehicles")
@AllArgsConstructor
public class VehicleController {

    private final VehicleService vehicleService;

    @PostMapping
    public ResponseEntity<Vehicle> saveVehicle(@RequestBody Vehicle vehicleRequest) {
        log.info("REST request to save vehicle: {}", vehicleRequest);
        return ResponseEntity.ok(vehicleService.saveVehicle(vehicleRequest));
    }

    @PutMapping
    public ResponseEntity<Vehicle> updateVehicle(@RequestBody Vehicle vehicle) {
        log.info("REST request to update vehicle: {}", vehicle);
        return ResponseEntity.ok(vehicleService.updateVehicle(vehicle));
    }

    @GetMapping("/my-vehicles")
    public ResponseEntity<List<Vehicle>> getMyVehicles() {
        log.info("REST request to get my vehicles");
        return ResponseEntity.ok(vehicleService.getMyVehicles());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVehicle(@PathVariable String id) {
        log.info("REST request to delete vehicle by id: {}", id);
        vehicleService.deleteVehicle(id);
        return ResponseEntity.noContent().build();
    }


}
