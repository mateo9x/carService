package com.mateo9x.dtos;

import lombok.Builder;
import lombok.Value;

import java.util.Map;

@Value
@Builder
public class KafkaMailDto {
    String from;
    String to;
    String subject;
    String message;
    String templatePath;
    Map<String, String> replacementStrings;
}
