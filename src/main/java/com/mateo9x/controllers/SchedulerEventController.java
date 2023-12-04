package com.mateo9x.controllers;

import com.mateo9x.entities.SchedulerEvent;
import com.mateo9x.services.SchedulerEventService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/scheduler-events")
@AllArgsConstructor
public class SchedulerEventController {

    private final SchedulerEventService schedulerEventService;


    @PostMapping
    public ResponseEntity<SchedulerEvent> saveSchedule(@RequestBody SchedulerEvent schedulerEvent) {
        log.info("REST request to save schedule: {}", schedulerEvent);
        return ResponseEntity.ok(schedulerEventService.save(schedulerEvent));
    }

    @GetMapping
    public ResponseEntity<List<SchedulerEvent>> getSchedulesByDateBetween(@RequestParam LocalDate dateFrom, @RequestParam LocalDate dateTo) {
        log.info("REST request to get schedules by date between: {} - {}", dateFrom, dateTo);
        return ResponseEntity.ok(schedulerEventService.getSchedulesByDateBetween(dateFrom, dateTo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSchedule(@PathVariable String id) {
        log.info("REST request to delete schedule by id: {}", id);
        schedulerEventService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
