package com.mateo9x.quartz;

import com.mateo9x.dtos.UserDto;
import com.mateo9x.entities.SchedulerEvent;
import com.mateo9x.entities.UserNotifyHistory;
import com.mateo9x.entities.Vehicle;
import com.mateo9x.enums.NotifyType;
import com.mateo9x.services.MailService;
import com.mateo9x.services.SchedulerEventService;
import com.mateo9x.services.UserNotifyHistoryService;
import com.mateo9x.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

import static org.apache.commons.collections4.CollectionUtils.isNotEmpty;

@Component
@AllArgsConstructor
public class SchedulerEventNotifyJob {

    private final SchedulerEventService schedulerEventService;
    private final MailService mailService;
    private final UserService userService;
    private final UserNotifyHistoryService userNotifyHistoryService;

    @Scheduled(cron = "0 0 8 * * *")
    public void notifyUsers() {
        userService.getAllUsers().forEach(user -> {
            if (isNotEmpty(user.getVehicles())) {
                user.getVehicles().forEach(vehicle -> {
                    LocalDateTime timeNow = LocalDateTime.now();
                    List<SchedulerEvent> schedulerEvents = schedulerEventService.getTodaySchedulesByVehicleId(vehicle.getId());
                    schedulerEvents.stream()
                            .filter(event -> isEventBeforeTime(event.getTime(), timeNow))
                            .filter(event -> notifyHasBeenSentAlready(event.getId()))
                            .forEach(event -> prepareSchedulerEventNotify(event, prepareVehicleName(vehicle), user));
                });
            }
        });
    }

    private boolean isEventBeforeTime(String eventTime, LocalDateTime timeNow) {
        int hours = Integer.parseInt(eventTime.substring(0, eventTime.indexOf(":")));
        int minutes = Integer.parseInt(eventTime.substring(eventTime.indexOf(":") + 1));
        return hours < timeNow.getHour() && minutes < timeNow.getMinute();
    }

    private void prepareSchedulerEventNotify(SchedulerEvent schedulerEvent, String vehicleName, UserDto userDto) {
        mailService.sendSchedulerEventNotify(userDto, vehicleName);
        userNotifyHistoryService.saveUserNotifyHistory(prepareUserNotifyHistory(schedulerEvent.getId(), userDto.getId()));
    }

    private String prepareVehicleName(Vehicle vehicle) {
        return vehicle.getBrand() + " " + vehicle.getModel() + " (" + vehicle.getLicensePlate() + ")";
    }

    private boolean notifyHasBeenSentAlready(String inspectionId) {
        return userNotifyHistoryService.findUserNotifyHistoryByNotifyTypeAndForeignId(NotifyType.SCHEDULER_EVENT, inspectionId).isPresent();
    }

    private UserNotifyHistory prepareUserNotifyHistory(String schedulerEventId, String userId) {
        return UserNotifyHistory.builder()
                .notifyType(NotifyType.SCHEDULER_EVENT)
                .userId(userId)
                .notifyForeignId(schedulerEventId)
                .build();
    }
}
