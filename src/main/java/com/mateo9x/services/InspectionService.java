package com.mateo9x.services;

import com.mateo9x.entities.Inspection;
import com.mateo9x.exceptions.InspectionException;
import com.mateo9x.repositories.InspectionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class InspectionService {
    private final InspectionRepository inspectionRepository;

    public Inspection saveInspection(Inspection inspection) {
        if (inspectionRepository.findByDate(inspection.getDate()).isPresent()) {
            throw new InspectionException("Przegląd w danym dniu istnieje dla wskazanego pojazdu");
        }
        return inspectionRepository.save(inspection);
    }

    public List<Inspection> getInspectionsForVehicle(String vehicleId) {
        return inspectionRepository.findAllByVehicleId(vehicleId).stream()
                .sorted(Comparator.comparing(Inspection::getDate, Comparator.reverseOrder()))
                .collect(Collectors.toList());
    }

    public void deleteInspection(String id) {
        inspectionRepository.deleteById(id);
    }

    public void deleteAllVehicleInspections(String vehicleId) {
        getInspectionsForVehicle(vehicleId).stream()
                .map(Inspection::getId)
                .forEach(this::deleteInspection);
    }
}
