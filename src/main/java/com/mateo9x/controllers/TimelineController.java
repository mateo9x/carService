package com.mateo9x.controllers;

import com.mateo9x.models.TimelineHistory;
import com.mateo9x.services.TimelineService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/timelines")
@AllArgsConstructor
public class TimelineController {

    private final TimelineService timelineService;

    @GetMapping("/vehicle/{vehicleId}")
    public ResponseEntity<List<TimelineHistory>> getTimelineHistoryForVehicle(@PathVariable String vehicleId) {
        log.info("REST request to get timeline history for vehicle: {}", vehicleId);
        return ResponseEntity.ok(timelineService.getTimelineHistoryForVehicle(vehicleId));
    }
}
