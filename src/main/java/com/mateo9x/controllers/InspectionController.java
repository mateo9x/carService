package com.mateo9x.controllers;

import com.mateo9x.entities.Inspection;
import com.mateo9x.services.InspectionService;
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
@RequestMapping("/inspections")
@AllArgsConstructor
public class InspectionController {

    private final InspectionService inspectionService;

    @PostMapping
    public ResponseEntity<Inspection> saveInspection(@RequestBody Inspection inspection) {
        log.info("REST request to save inspection: {}", inspection);
        return ResponseEntity.ok(inspectionService.saveInspection(inspection));
    }

    @GetMapping("/vehicle/{vehicleId}")
    public ResponseEntity<List<Inspection>> getInspectionsForVehicle(@PathVariable String vehicleId) {
        log.info("REST request to get inspections for vehicleId: {}", vehicleId);
        return ResponseEntity.ok(inspectionService.getInspectionsForVehicle(vehicleId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInspection(@PathVariable String id) {
        log.info("REST request to delete inspection by id: {}", id);
        inspectionService.deleteInspection(id);
        return ResponseEntity.noContent().build();
    }

}
