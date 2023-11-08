package com.mateo9x.services;

import com.mateo9x.entities.Expension;
import com.mateo9x.repositories.ExpensionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ExpensionService {

    private final ExpensionRepository expensionRepository;
    private final AttachmentService attachmentService;

    @Transactional
    public Expension saveExpension(Expension expension, List<MultipartFile> multipartFiles) {
        if (multipartFiles != null && !multipartFiles.isEmpty()) {
            List<String> paths = new ArrayList<>();
            multipartFiles.forEach((multipartFile -> paths.add(attachmentService.saveAttachment(multipartFile))));
            expension.setAttachmentsNames(paths);
        }
        return expensionRepository.save(expension);
    }

    public List<Expension> getExpensesByVehicleId(String vehicleId) {
        return expensionRepository.findAllByVehicleId(vehicleId).stream()
                .sorted(Comparator.comparing(Expension::getDate, Comparator.reverseOrder()))
                .collect(Collectors.toList());
    }

    public void deleteExpension(String id) {
        expensionRepository.deleteById(id);
    }
}
