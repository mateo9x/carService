package com.mateo9x.dtos;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class KafkaMailDto {
    String from;
    String to;
    String subject;
    String message;
}
