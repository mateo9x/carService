package com.mateo9x.providers;

import com.mateo9x.entities.Insurance;
import com.mateo9x.enums.ReportRange;
import com.mateo9x.models.ReportData;
import com.mateo9x.models.ReportDataRequest;
import com.mateo9x.services.InsuranceService;
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
public class ReportInsuranceDataProvider implements ReportDataProvider {

    private final InsuranceService insuranceService;
    private final VehicleService vehicleService;

    @Override
    public boolean supports(ReportRange reportRange) {
        return ReportRange.INSURANCE.equals(reportRange);
    }

    @Override
    public ReportData prepareData(ReportDataRequest reportDataRequest) {
        Map<String, List<Object>> map = new TreeMap<>();
        List<Insurance> insurances = new ArrayList<>();
        reportDataRequest.getVehicles().forEach(vehicleId -> insurances.addAll(insuranceService.getInsurancesByVehicleId(vehicleId)));
        if (!insurances.isEmpty()) {
            List<Insurance> insurancesBetweenDates = insurances.stream()
                    .filter(insurance -> insurance.getDateFrom().isAfter(reportDataRequest.getDateFrom()) && insurance.getDateTo().isBefore(reportDataRequest.getDateTo()))
                    .toList();
            if (!insurancesBetweenDates.isEmpty()) {
                map.put("POJAZD", insurancesBetweenDates.stream().map(Insurance::getVehicleId).map(this::getVehicleFullName).collect(Collectors.toList()));
                map.put("DATA OD", insurancesBetweenDates.stream().map(Insurance::getDateFrom).collect(Collectors.toList()));
                map.put("DATA DO", insurancesBetweenDates.stream().map(Insurance::getDateTo).collect(Collectors.toList()));
            }
        }
        return ReportData.of(map);
    }

    private String getVehicleFullName(String vehicleId) {
        return vehicleService.getVehicleFullNameByVehicleId(vehicleId);
    }
}
