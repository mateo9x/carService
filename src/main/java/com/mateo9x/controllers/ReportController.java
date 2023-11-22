package com.mateo9x.controllers;

import com.mateo9x.enums.ReportType;
import com.mateo9x.exceptions.ReportException;
import com.mateo9x.models.ReportData;
import com.mateo9x.models.ReportDataRequest;
import com.mateo9x.providers.ReportDataProvider;
import com.mateo9x.services.ReportService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.TreeMap;

@Slf4j
@RestController
@RequestMapping("/reports")
@AllArgsConstructor
public class ReportController {

    private final List<ReportDataProvider> reportDataProviders;
    private final ReportService reportService;

    @PostMapping("/type/{reportType}")
    public byte[] generateReport(@PathVariable ReportType reportType, @RequestBody ReportDataRequest reportDataRequest) {
        log.info("REST request to generate report: {}", reportType);

        Map<String, ReportData> reportDataMap = new TreeMap<>();

        reportDataRequest.getReportRanges()
                .forEach(reportRange -> {
                    ReportDataProvider reportDataProvider = reportDataProviders.stream()
                            .filter(provider -> provider.supports(reportRange))
                            .findFirst()
                            .orElseThrow(() -> new ReportException("Report range not supported!"));
                    reportDataMap.put(reportRange.getLabel(), reportDataProvider.prepareData(reportDataRequest));
                });

        if (!hasMapData(reportDataMap)) {
            return null;
        }

        File file;
        if (ReportType.XLSX.equals(reportType)) {
            file = reportService.generateXlsxReport(reportDataMap);
        } else {
            file = reportService.generatePdfReport(reportDataMap);
        }
        try {
            return Files.readAllBytes(file.toPath());
        } catch (IOException e) {
            log.error("REST couldn't get report: {}", e.getMessage());
            throw new RuntimeException(e);
        }
    }

    private boolean hasMapData(Map<String, ReportData> reportDataMap) {
        return reportDataMap.values().stream()
                .map(ReportData::getData)
                .filter(Objects::nonNull)
                .filter(element -> !element.isEmpty())
                .toList().size() > 0;
    }
}
