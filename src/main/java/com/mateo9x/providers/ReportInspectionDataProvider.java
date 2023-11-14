package com.mateo9x.providers;

import com.mateo9x.entities.Inspection;
import com.mateo9x.enums.ReportRange;
import com.mateo9x.models.ReportData;
import com.mateo9x.models.ReportDataRequest;
import com.mateo9x.services.InspectionService;
import com.mateo9x.services.VehicleService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class ReportInspectionDataProvider implements ReportDataProvider {

    private final InspectionService inspectionService;
    private final VehicleService vehicleService;

    @Override
    public boolean supports(ReportRange reportRange) {
        return ReportRange.INSPECTION.equals(reportRange);
    }

    @Override
    public ReportData prepareData(ReportDataRequest reportDataRequest) {
        Map<String, List<Object>> map = new TreeMap<>();
        List<Inspection> inspections = new ArrayList<>();
        reportDataRequest.getVehicles().forEach(vehicleId -> inspections.addAll(inspectionService.getInspectionsForVehicle(vehicleId)));
        if (!inspections.isEmpty()) {
            List<Inspection> inspectionsBetweenDates = inspections.stream()
                    .filter(inspection -> inspection.getDate().isAfter(reportDataRequest.getDateFrom()) && inspection.getDate().isBefore(reportDataRequest.getDateTo()))
                    .toList();
            if (!inspectionsBetweenDates.isEmpty()) {
                map.put("POJAZD", inspectionsBetweenDates.stream().map(Inspection::getVehicleId).map(this::getVehicleFullName).collect(Collectors.toList()));
                map.put("DATA", inspectionsBetweenDates.stream().map(Inspection::getDate).collect(Collectors.toList()));
            }
        }
        return ReportData.of(map);
    }

    private String getVehicleFullName(String vehicleId) {
        return vehicleService.getVehicleFullNameByVehicleId(vehicleId);
    }

}
