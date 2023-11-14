package com.mateo9x.models;

import com.mateo9x.enums.ReportRange;
import lombok.Value;

import java.time.LocalDate;
import java.util.List;

@Value
public class ReportDataRequest {
    List<String> vehicles;
    List<ReportRange> reportRanges;
    LocalDate dateFrom;
    LocalDate dateTo;
}
