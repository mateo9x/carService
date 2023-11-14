package com.mateo9x.models;

import lombok.Value;

import java.util.List;
import java.util.Map;

@Value(staticConstructor = "of")
public class ReportData {
    Map<String, List<Object>> data;
}
