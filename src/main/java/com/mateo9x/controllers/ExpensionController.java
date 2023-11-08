package com.mateo9x.controllers;

import com.mateo9x.entities.Expension;
import com.mateo9x.services.ExpensionService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/expenses")
@AllArgsConstructor
public class ExpensionController {

    private final ExpensionService expensionService;


    @PostMapping
    public ResponseEntity<Expension> saveExpension(@RequestPart(value = "attachments", required = false) List<MultipartFile> attachments,
                                                 @RequestPart(value = "expension") Expension expension) {
        log.info("REST request to save expension: {}", expension);
        return ResponseEntity.ok(expensionService.saveExpension(expension, attachments));
    }

    @GetMapping("/vehicle/{vehicleId}")
    public ResponseEntity<List<Expension>> getExpensesByVehicleId(@PathVariable String vehicleId) {
        log.info("REST request to get expenses by vehicle id: {}", vehicleId);
        return ResponseEntity.ok(expensionService.getExpensesByVehicleId(vehicleId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExpension(@PathVariable String id) {
        log.info("REST request to delete expension by id: {}", id);
        expensionService.deleteExpension(id);
        return ResponseEntity.noContent().build();
    }
}
