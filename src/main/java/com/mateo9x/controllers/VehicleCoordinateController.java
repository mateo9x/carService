package com.mateo9x.controllers;

import com.mateo9x.entities.VehicleCoordinate;
import com.mateo9x.services.VehicleCoordinateService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/vehicle-coordinates")
@AllArgsConstructor
public class VehicleCoordinateController {

    private final VehicleCoordinateService vehicleCoordinateService;

    @PostMapping
    public ResponseEntity<VehicleCoordinate> saveVehicleCoordinates(@RequestBody VehicleCoordinate vehicleCoordinate) {
        log.info("REST request to save vehicle coordinates: {}", vehicleCoordinate);
        return ResponseEntity.ok(vehicleCoordinateService.saveVehicleCoordinate(vehicleCoordinate));
    }
}
