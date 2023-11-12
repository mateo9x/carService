package com.mateo9x.quartz;

import com.mateo9x.dtos.UserDto;
import com.mateo9x.entities.Inspection;
import com.mateo9x.entities.UserNotifyHistory;
import com.mateo9x.entities.UserPreferences;
import com.mateo9x.entities.Vehicle;
import com.mateo9x.enums.NotifyType;
import com.mateo9x.services.InspectionService;
import com.mateo9x.services.MailService;
import com.mateo9x.services.UserNotifyHistoryService;
import com.mateo9x.services.UserPreferencesService;
import com.mateo9x.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

import static org.apache.commons.collections4.CollectionUtils.isNotEmpty;

@Component
@AllArgsConstructor
public class InspectionNotifyJob {
    private static final Integer DEFAULT_MILEAGE_TILL_NOTIFY = 1000;

    private final InspectionService inspectionService;
    private final MailService mailService;
    private final UserService userService;
    private final UserPreferencesService userPreferencesService;
    private final UserNotifyHistoryService userNotifyHistoryService;

    @Scheduled(cron = "0 0 8 * * *")
    public void notifyUsers() {
        userService.getAllUsers().forEach(user -> {
            if (isNotEmpty(user.getVehicles())) {
                UserPreferences userPreferences = userPreferencesService.getUserPreferencesByUserId(user.getId());
                if (userPreferences == null) {
                    user.getVehicles().forEach(vehicle -> {
                        List<Inspection> inspections = inspectionService.getInspectionsForVehicle(vehicle.getId());
                        Optional<Inspection> latestInspectionOptional = Optional.of(inspections.get(0));
                        latestInspectionOptional.ifPresent(inspection -> prepareInspectionNotify(inspection, prepareVehicleName(vehicle), user, DEFAULT_MILEAGE_TILL_NOTIFY));
                    });
                }
                if (userPreferences != null && Boolean.TRUE.equals(userPreferences.getNotifyInspections())) {
                    user.getVehicles().forEach(vehicle -> {
                        List<Inspection> inspections = inspectionService.getInspectionsForVehicle(vehicle.getId());
                        Optional<Inspection> latestInspectionOptional = Optional.of(inspections.get(0));
                        latestInspectionOptional.ifPresent(inspection -> prepareInspectionNotify(inspection, prepareVehicleName(vehicle), user, userPreferences.getMileageBeforeInspectionExpire()));
                    });
                }
            }
        });
    }

    private void prepareInspectionNotify(Inspection inspection, String vehicleName, UserDto userDto, Integer daysTillInspection) {
        if (inspection.getNextServiceMileage() - inspection.getCurrentMileage() <= daysTillInspection && !notifyHasBeenSentAlready(inspection.getId())) {
            mailService.sendInspectionNotify(userDto, inspection, vehicleName);
            userNotifyHistoryService.saveUserNotifyHistory(prepareUserNotifyHistory(inspection.getId(), userDto.getId()));
        }
    }

    private String prepareVehicleName(Vehicle vehicle) {
        return vehicle.getBrand() + " " + vehicle.getModel() + " (" + vehicle.getLicensePlate() + ")";
    }

    private boolean notifyHasBeenSentAlready(String inspectionId) {
        return userNotifyHistoryService.findUserNotifyHistoryByNotifyTypeAndForeignId(NotifyType.INSPECTION, inspectionId).isPresent();
    }

    private UserNotifyHistory prepareUserNotifyHistory(String insuranceId, String userId) {
        return UserNotifyHistory.builder()
                .notifyType(NotifyType.INSPECTION)
                .userId(userId)
                .notifyForeignId(insuranceId)
                .build();
    }
}
