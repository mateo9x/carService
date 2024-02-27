package com.mateo9x.controllers;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequestMapping("/kafka")
@AllArgsConstructor
public class KafkaController {

    private final KafkaTemplate<String, String> kafkaTemplate;

    @PostMapping("/{topic}/send")
    public void sendMessage(@RequestBody String message, @PathVariable String topic) {
        log.info("Sending message: {} for topic: {}", message, topic);
        kafkaTemplate.send(topic, message);
    }
}
