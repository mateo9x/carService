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
                map.put("WYMIANA OLEJU", inspectionsBetweenDates.stream().map(Inspection::getOilChanged).map(this::getBooleanLabel).collect(Collectors.toList()));
                map.put("WYMIANA FILTRA OLEJU", inspectionsBetweenDates.stream().map(Inspection::getOilFilterChanged).map(this::getBooleanLabel).collect(Collectors.toList()));
                map.put("TYP OLEJU", inspectionsBetweenDates.stream().map(Inspection::getOilType).collect(Collectors.toList()));
                map.put("WYMIANA FILTRA PALIWA", inspectionsBetweenDates.stream().map(Inspection::getFuelFilterChanged).map(this::getBooleanLabel).collect(Collectors.toList()));
                map.put("WYMIANA ŚWIEC ZAPŁONOWYCH", inspectionsBetweenDates.stream().map(Inspection::getSparkPlugChanged).map(this::getBooleanLabel).collect(Collectors.toList()));
                map.put("WYMIANA FILTRA POWIETRZA", inspectionsBetweenDates.stream().map(Inspection::getAirFilterChanged).map(this::getBooleanLabel).collect(Collectors.toList()));
                map.put("WYMIANA FILTRA KABINOWEGO", inspectionsBetweenDates.stream().map(Inspection::getCabinFilterChanged).map(this::getBooleanLabel).collect(Collectors.toList()));
                map.put("DODATKOWE INFORMACJE", inspectionsBetweenDates.stream().map(Inspection::getAdditionalInfo).collect(Collectors.toList()));
                map.put("AKTUALNY PRZEBIEG", inspectionsBetweenDates.stream().map(Inspection::getCurrentMileage).collect(Collectors.toList()));
                map.put("PRZEBIEG NASTĘPNEGO PRZEGLĄDU", inspectionsBetweenDates.stream().map(Inspection::getNextServiceMileage).collect(Collectors.toList()));
            }
        }
        return ReportData.of(map);
    }

    private String getVehicleFullName(String vehicleId) {
        return vehicleService.getVehicleFullNameByVehicleId(vehicleId);
    }

    private String getBooleanLabel(Boolean value) {
        if (value) {
            return "Tak";
        }
        return "Nie";
    }

}
