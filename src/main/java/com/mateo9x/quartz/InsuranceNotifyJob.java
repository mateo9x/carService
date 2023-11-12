package com.mateo9x.quartz;

import com.mateo9x.dtos.UserDto;
import com.mateo9x.entities.Insurance;
import com.mateo9x.entities.UserNotifyHistory;
import com.mateo9x.entities.UserPreferences;
import com.mateo9x.entities.Vehicle;
import com.mateo9x.enums.NotifyType;
import com.mateo9x.services.InsuranceService;
import com.mateo9x.services.MailService;
import com.mateo9x.services.UserNotifyHistoryService;
import com.mateo9x.services.UserPreferencesService;
import com.mateo9x.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import static org.apache.commons.collections4.CollectionUtils.isNotEmpty;

@Component
@AllArgsConstructor
public class InsuranceNotifyJob {

    private static final Integer DEFAULT_DAYS_TILL_PAYMENT_NOTIFY = 10;

    private final InsuranceService insuranceService;
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
                        List<Insurance> insurances = insuranceService.getInsurancesByVehicleId(vehicle.getId());
                        Optional<Insurance> latestInsuranceOptional = Optional.of(insurances.get(0));
                        latestInsuranceOptional.ifPresent(insurance -> prepareInsuranceNotify(insurance, prepareVehicleName(vehicle), user, DEFAULT_DAYS_TILL_PAYMENT_NOTIFY));
                    });
                }
                if (userPreferences != null && Boolean.TRUE.equals(userPreferences.getNotifyInsurance())) {
                    user.getVehicles().forEach(vehicle -> {
                        List<Insurance> insurances = insuranceService.getInsurancesByVehicleId(vehicle.getId());
                        Optional<Insurance> latestInsuranceOptional = Optional.of(insurances.get(0));
                        latestInsuranceOptional.ifPresent(insurance -> prepareInsuranceNotify(insurance, prepareVehicleName(vehicle), user, userPreferences.getDaysBeforeInsuranceExpire()));
                    });
                }
            }
        });
    }

    private void prepareInsuranceNotify(Insurance insurance, String vehicleName, UserDto userDto, Integer daysTillPayment) {
        LocalDate upcomingPaymentDeadline = findUpcomingPaymentDeadline(insurance.getPaymentDeadlines());
        if (upcomingPaymentDeadline != null && ChronoUnit.DAYS.between(upcomingPaymentDeadline, LocalDateTime.now()) <= daysTillPayment && !notifyHasBeenSentAlready(insurance.getId())) {
            mailService.sendInsuranceNotify(userDto, upcomingPaymentDeadline, vehicleName);
            userNotifyHistoryService.saveUserNotifyHistory(prepareUserNotifyHistory(insurance.getId(), userDto.getId()));
        }
    }

    private LocalDate findUpcomingPaymentDeadline(List<LocalDate> paymentDeadlines) {
        return paymentDeadlines.stream()
                .filter(paymentDeadline -> LocalDateTime.now().isBefore(paymentDeadline.atStartOfDay()))
                .max(Comparator.naturalOrder())
                .orElse(null);
    }

    private String prepareVehicleName(Vehicle vehicle) {
        return vehicle.getBrand() + " " + vehicle.getModel() + " (" + vehicle.getLicensePlate() + ")";
    }

    private boolean notifyHasBeenSentAlready(String insuranceId) {
        return userNotifyHistoryService.findUserNotifyHistoryByNotifyTypeAndForeignId(NotifyType.INSURANCE, insuranceId).isPresent();
    }

    private UserNotifyHistory prepareUserNotifyHistory(String insuranceId, String userId) {
        return UserNotifyHistory.builder()
                .notifyType(NotifyType.INSURANCE)
                .userId(userId)
                .notifyForeignId(insuranceId)
                .build();
    }
}
