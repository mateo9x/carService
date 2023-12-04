package com.mateo9x.services;

import com.mateo9x.entities.SchedulerEvent;
import com.mateo9x.repositories.SchedulerEventRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class SchedulerEventService {

    private final SchedulerEventRepository schedulerEventRepository;

    public SchedulerEvent save(SchedulerEvent schedulerEvent) {
        String time = schedulerEvent.getTime();
        schedulerEvent.setTime(time.substring(0, 2) + ":" + time.substring(2));
        return schedulerEventRepository.save(schedulerEvent);
    }

    public List<SchedulerEvent> getSchedulesByDateBetween(LocalDate dateFrom, LocalDate dateTo) {
        return schedulerEventRepository.findByDatesBetween(dateFrom, dateTo);
    }

    public List<SchedulerEvent> getTodaySchedulesByVehicleId(String vehicleId) {
        return schedulerEventRepository.findAllByDateAndVehicleId(LocalDate.now(), vehicleId);
    }

    public void delete(String scheduleId) {
        schedulerEventRepository.deleteById(scheduleId);
    }
}
