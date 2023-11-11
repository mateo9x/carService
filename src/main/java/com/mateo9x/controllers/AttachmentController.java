package com.mateo9x.controllers;

import com.mateo9x.enums.AttachmentType;
import com.mateo9x.services.AttachmentService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@Slf4j
@RestController
@RequestMapping("/attachments")
@AllArgsConstructor
public class AttachmentController {

    private final AttachmentService attachmentService;

    @GetMapping("/{attachmentType}/{fileName}")
    public byte[] getAttachment(@PathVariable AttachmentType attachmentType, @PathVariable String fileName) {
        log.info("REST request to get attachment: {} {}", attachmentType, fileName);
        File file = attachmentService.getAttachment(attachmentType, fileName);
        try {
            return Files.readAllBytes(file.toPath());
        } catch (IOException e) {
            log.error("REST couldn't get attachment: {}", e.getMessage());
            throw new RuntimeException(e);
        }
    }
}
