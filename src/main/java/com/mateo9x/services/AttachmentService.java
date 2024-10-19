package com.mateo9x.services;

import com.mateo9x.enums.AttachmentType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

@Slf4j
@Service
public class AttachmentService {

    private static final Path PATH = Path.of(".").resolve("assets");
    private static final String ASSETS_URL = "/api/v1/attachments";
    @Value("${car-service.app-url}")
    private String appUrl;

    public File getAttachment(AttachmentType attachmentType, String fileName) {
        Path path = PATH.resolve("/" + attachmentType.getValue() + fileName);
        try {
            return ResourceUtils.getFile(path.toUri());
        } catch (FileNotFoundException e) {
            log.error(e.getMessage(), e);
            throw new RuntimeException(e);
        }
    }

    public String saveAttachment(MultipartFile multipartFile, AttachmentType attachmentType) {
        try {
            String fileName = UUID.randomUUID() + "_" + multipartFile.getOriginalFilename();
            fileName = fileName.trim();
            String filePath = "/" + attachmentType.getValue() + fileName;
            Path newPath = PATH.resolve(filePath).normalize();
            Files.createDirectories(newPath.getParent());
            Files.copy(multipartFile.getInputStream(), newPath);
            return fileName;
        } catch (IOException e) {
            throw new RuntimeException(String.format("Nie udało zapisać się załącznika: %s", multipartFile.getOriginalFilename()));
        }
    }

    public void deleteAttachment(String fileName, AttachmentType attachmentType) {
        Path path = PATH.resolve("/" + attachmentType.getValue() + fileName).normalize();
        try {
            Files.deleteIfExists(path);
        } catch (IOException e) {
            log.warn("Couldn't delete attachment: {}, path not found: {}", fileName, path);
        }
    }

    public URI getAttachmentUri(AttachmentType attachmentType, String attachmentName) {
        return UriComponentsBuilder.fromUriString(appUrl + ASSETS_URL).pathSegment(attachmentType.name()).pathSegment(attachmentName).build().toUri();
    }
}
