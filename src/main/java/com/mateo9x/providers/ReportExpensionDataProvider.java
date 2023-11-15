package com.mateo9x.providers;

import com.mateo9x.entities.Expension;
import com.mateo9x.enums.ReportRange;
import com.mateo9x.models.ReportData;
import com.mateo9x.models.ReportDataRequest;
import com.mateo9x.services.ExpensionService;
import com.mateo9x.services.VehicleService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

import static org.apache.commons.collections4.CollectionUtils.isNotEmpty;

@Component
@AllArgsConstructor
public class ReportExpensionDataProvider implements ReportDataProvider {

    private final ExpensionService expensionService;
    private final VehicleService vehicleService;

    @Override
    public boolean supports(ReportRange reportRange) {
        return ReportRange.EXPENSION.equals(reportRange);
    }

    @Override
    public ReportData prepareData(ReportDataRequest reportDataRequest) {
        Map<String, List<Object>> map = new TreeMap<>();
        List<Expension> expensions = new ArrayList<>();
        reportDataRequest.getVehicles().forEach(vehicleId -> expensions.addAll(expensionService.getExpensesByVehicleId(vehicleId)));
        if (!expensions.isEmpty()) {
            List<Expension> expensionsBetweenDates = expensions.stream()
                    .filter(expension -> expension.getDate().isAfter(reportDataRequest.getDateFrom()) && expension.getDate().isBefore(reportDataRequest.getDateTo()))
                    .toList();
            if (!expensionsBetweenDates.isEmpty()) {
                map.put("POJAZD", expensionsBetweenDates.stream().map(Expension::getVehicleId).map(this::getVehicleFullName).collect(Collectors.toList()));
                map.put("DATA", expensionsBetweenDates.stream().map(Expension::getDate).collect(Collectors.toList()));
                map.put("INFORMACJE", expensionsBetweenDates.stream().map(Expension::getInfo).collect(Collectors.toList()));
                map.put("KWOTA [PLN]", expensionsBetweenDates.stream().map(Expension::getAmount).collect(Collectors.toList()));
                map.put("ZAŁĄCZNIKI", expensionsBetweenDates.stream().map(Expension::getAttachmentsNames).map(this::normalizeAttachmentName).collect(Collectors.toList()));
            }
        }
        return ReportData.of(map);
    }

    private String getVehicleFullName(String vehicleId) {
        return vehicleService.getVehicleFullNameByVehicleId(vehicleId);
    }

    private String normalizeAttachmentName(List<String> attachmentNames) {
        if (isNotEmpty(attachmentNames)) {
            List<String> normalizedNames = new ArrayList<>();
            attachmentNames.forEach(attachmentName -> normalizedNames.add(attachmentName.substring(attachmentName.indexOf("_") + 1)));
            return String.join(",", normalizedNames);
        }
        return null;
    }
}
