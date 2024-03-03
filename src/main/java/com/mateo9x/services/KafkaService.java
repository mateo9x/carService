package com.mateo9x.services;

import com.mateo9x.exceptions.KafkaException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Slf4j
@Service
@AllArgsConstructor
public class KafkaService {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void sendMessage(String topic, Object message) {
        CompletableFuture<SendResult<String, Object>> sendResult = kafkaTemplate.send(topic, message);
        if (!sendResult.isDone()) {
            log.error("Wysyłka wiadomości: {} na topic: {} nie powiodła się", message, topic);
            throw new KafkaException(String.format("Wysyłka wiadomości na topic: %s nie powiodła się", topic));
        }
    }
}
