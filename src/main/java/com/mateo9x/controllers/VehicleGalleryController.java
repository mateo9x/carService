package com.mateo9x.controllers;

import com.mateo9x.entities.Vehicle;
import com.mateo9x.enums.AttachmentType;
import com.mateo9x.exceptions.VehicleException;
import com.mateo9x.services.AttachmentService;
import com.mateo9x.services.VehicleService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static java.util.Objects.nonNull;

@Slf4j
@RestController
@RequestMapping("/vehicle-galleries")
@AllArgsConstructor
public class VehicleGalleryController {

    private final VehicleService vehicleService;
    private final AttachmentService attachmentService;

    @GetMapping("/{vehicleId}")
    public ResponseEntity<List<URI>> getVehicleGallery(@PathVariable String vehicleId) {
        log.info("REST request to get URIs for vehicle: {}", vehicleId);
        List<URI> uris = new ArrayList<>();
        List<String> attachmentNames = vehicleService.getMyVehicles()
                .stream()
                .filter(vehicle -> nonNull(vehicle.getAttachmentsNames()))
                .filter(vehicle -> vehicleId.equals(vehicle.getId()))
                .map(Vehicle::getAttachmentsNames)
                .findFirst()
                .orElse(Collections.emptyList());
        attachmentNames.forEach(attachmentName -> uris.add(attachmentService.getAttachmentUri(AttachmentType.VEHICLE, attachmentName)));
        return ResponseEntity.ok(uris);
    }

}
