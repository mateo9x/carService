package com.mateo9x.enums;

public enum ReportRange {
    INSPECTION("Przeglądy"),
    INSURANCE("Ubezpieczenia"),
    EXPENSION("Wydatki");

    private final String label;

    public String getLabel() {
        return label;
    }

    ReportRange(String label) {
        this.label = label;
    }
}
