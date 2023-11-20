package com.mateo9x.services;

import com.mateo9x.entities.Expension;
import com.mateo9x.entities.Inspection;
import com.mateo9x.entities.Insurance;
import com.mateo9x.entities.Vehicle;
import com.mateo9x.models.TimelineHistory;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@AllArgsConstructor
public class TimelineService {

    private final ExpensionService expensionService;
    private final InspectionService inspectionService;
    private final InsuranceService insuranceService;
    private final VehicleService vehicleService;

    public List<TimelineHistory> getTimelineHistoryForVehicle(String vehicleId) {
        List<TimelineHistory> timelineHistories = new ArrayList<>();
        List<Expension> expensions = expensionService.getExpensesByVehicleId(vehicleId);
        List<Inspection> inspections = inspectionService.getInspectionsForVehicle(vehicleId);
        List<Insurance> insurances = insuranceService.getInsurancesByVehicleId(vehicleId);
        Vehicle vehicle = vehicleService.getVehicleById(vehicleId);
        AtomicInteger timelineHistoryId = new AtomicInteger();

        timelineHistories.add(prepareTimelineHistory(vehicle, timelineHistoryId));

        if (!expensions.isEmpty()) {
            expensions.forEach(expension -> timelineHistories.add(prepareTimelineHistory(expension, timelineHistoryId)));
        }

        if (!inspections.isEmpty()) {
            inspections.forEach(inspection -> timelineHistories.add(prepareTimelineHistory(inspection, timelineHistoryId)));
        }

        if (!insurances.isEmpty()) {
            insurances.forEach(insurance -> timelineHistories.add(prepareTimelineHistory(insurance, timelineHistoryId)));
        }

        return timelineHistories.stream()
                .sorted(Comparator.comparing(TimelineHistory::getTimestamp, Comparator.reverseOrder()))
                .map(this::setItemPosition)
                .toList();
    }

    private TimelineHistory prepareTimelineHistory(Vehicle vehicle, AtomicInteger timelineHistoryId) {
        return TimelineHistory.builder()
                .id(timelineHistoryId.incrementAndGet())
                .timestamp(Timestamp.from(vehicle.getPurchaseDate().atStartOfDay(ZoneId.systemDefault()).toInstant()))
                .title("Zakup pojazdu")
                .description(String.format("Rok produkcji: %s. Przebieg w dniu zakupu: %s km", vehicle.getProductionYear(), vehicle.getPurchaseMileage()))
                .build();
    }

    private TimelineHistory prepareTimelineHistory(Expension expension, AtomicInteger timelineHistoryId) {
        return TimelineHistory.builder()
                .id(timelineHistoryId.incrementAndGet())
                .timestamp(Timestamp.from(expension.getDate().atStartOfDay(ZoneId.systemDefault()).toInstant()))
                .title("Poniesiony wydatek")
                .description(String.format("Kwota: %.2f PLN. Dodatkowe informacje: %s", expension.getAmount(), expension.getInfo()))
                .build();
    }

    private TimelineHistory prepareTimelineHistory(Inspection inspection, AtomicInteger timelineHistoryId) {
        return TimelineHistory.builder()
                .id(timelineHistoryId.incrementAndGet())
                .timestamp(Timestamp.from(inspection.getDate().atStartOfDay(ZoneId.systemDefault()).toInstant()))
                .title("Wykonany przegląd")
                .description(String.format("Przegląd przy przebiegu: %s km. Następny przegląd: %s km", inspection.getCurrentMileage(), inspection.getNextServiceMileage()))
                .build();

    }

    private TimelineHistory prepareTimelineHistory(Insurance insurance, AtomicInteger timelineHistoryId) {
        return TimelineHistory.builder()
                .id(timelineHistoryId.incrementAndGet())
                .timestamp(Timestamp.from(insurance.getDateFrom().atStartOfDay(ZoneId.systemDefault()).toInstant()))
                .title("Zakup ubezpieczenia")
                .description(String.format("Ubezpieczyciel %s. Polisa ważna od: %s do %s", insurance.getCompany(), insurance.getDateFrom(), insurance.getDateTo()))
                .build();
    }

    private TimelineHistory setItemPosition(TimelineHistory timelineHistory) {
        if (timelineHistory.getId() % 2 == 0) {
            timelineHistory.setItemPosition(TimelineHistory.TimeLineHistoryItemPosition.ON_RIGHT);
        } else {
            timelineHistory.setItemPosition(TimelineHistory.TimeLineHistoryItemPosition.ON_LEFT);
        }
        return timelineHistory;
    }
}
