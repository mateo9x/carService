package com.mateo9x.controllers;

import com.mateo9x.entities.Vehicle;
import com.mateo9x.services.VehicleService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
