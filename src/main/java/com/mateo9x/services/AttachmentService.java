package com.mateo9x.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@Slf4j
@Service
public class AttachmentService {

    private static final Path PATH = Path.of(".").resolve("assets");

    public String saveAttachment(MultipartFile multipartFile) {
        try {
            Files.createDirectories(PATH.getParent());
            Files.copy(multipartFile.getInputStream(), PATH);
            return multipartFile.getName();
        } catch (IOException e) {
            throw new RuntimeException(String.format("Nie udało zapisać się załącznika: %s", multipartFile.getName()));
        }
    }
}
