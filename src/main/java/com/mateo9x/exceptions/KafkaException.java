package com.mateo9x.exceptions;

public class KafkaException extends RuntimeException {

    public KafkaException(String message) {
        super(message);
    }
}
