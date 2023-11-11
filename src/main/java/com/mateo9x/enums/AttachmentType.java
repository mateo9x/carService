package com.mateo9x.enums;

public enum AttachmentType {
    EXPENSION("expension/");

    private final String value;

    public String getValue() {
        return value;
    }

    AttachmentType(String s) {
        this.value = s;
    }
}
