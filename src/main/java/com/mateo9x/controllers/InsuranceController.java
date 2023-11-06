package com.mateo9x.controllers;

import com.mateo9x.entities.Insurance;
import com.mateo9x.services.InsuranceService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/insurances")
@AllArgsConstructor
public class InsuranceController {

    private final InsuranceService insuranceService;

    @PostMapping
    public ResponseEntity<Insurance> saveInsurance(@RequestBody Insurance insurance) {
        log.info("REST request to save insurance: {}", insurance);
        return ResponseEntity.ok(insuranceService.saveInsurance(insurance));
    }

    @GetMapping("/vehicle/{vehicleId}")
    public ResponseEntity<List<Insurance>> getInsurancesByVehicleId(@PathVariable String vehicleId) {
        log.info("REST request to get insurances by vehicle id: {}", vehicleId);
        return ResponseEntity.ok(insuranceService.getInsurancesByVehicleId(vehicleId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInsuranceById(@PathVariable String id) {
        log.info("REST request to delete insurance by id: {}", id);
        insuranceService.deleteInsuranceById(id);
        return ResponseEntity.noContent().build();
    }

}
