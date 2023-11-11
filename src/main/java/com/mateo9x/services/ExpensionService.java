package com.mateo9x.services;

import com.mateo9x.entities.Expension;
import com.mateo9x.enums.AttachmentType;
import com.mateo9x.repositories.ExpensionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.apache.commons.collections4.CollectionUtils.isNotEmpty;

@Service
@AllArgsConstructor
public class ExpensionService {

    private final ExpensionRepository expensionRepository;
    private final AttachmentService attachmentService;

    @Transactional
    public Expension saveExpension(Expension expension, List<MultipartFile> multipartFiles) {
        if (isNotEmpty(multipartFiles)) {
            List<String> attachmentsNames = new ArrayList<>();
            multipartFiles.forEach(multipartFile -> attachmentsNames.add(attachmentService.saveAttachment(multipartFile, AttachmentType.EXPENSION)));
            expension.setAttachmentsNames(attachmentsNames);
        }
        return expensionRepository.save(expension);
    }

    public List<Expension> getExpensesByVehicleId(String vehicleId) {
        return expensionRepository.findAllByVehicleId(vehicleId).stream()
                .sorted(Comparator.comparing(Expension::getDate, Comparator.reverseOrder()))
                .collect(Collectors.toList());
    }

    public void deleteExpension(String id) {
        Optional<Expension> expensionOptional = expensionRepository.findById(id);
        if (expensionOptional.isPresent()) {
            Expension expension = expensionOptional.get();
            if (isNotEmpty(expension.getAttachmentsNames())) {
                expension.getAttachmentsNames().forEach(attachmentName -> attachmentService.deleteAttachment(attachmentName, AttachmentType.EXPENSION));
            }
            expensionRepository.deleteById(id);
        }
    }

    public void deleteAllVehicleExpenses(String vehicleId) {
        getExpensesByVehicleId(vehicleId).stream()
                .map(Expension::getId)
                .forEach(this::deleteExpension);
    }
}
