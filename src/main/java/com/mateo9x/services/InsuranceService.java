package com.mateo9x.services;

import com.mateo9x.entities.Insurance;
import com.mateo9x.repositories.InsuranceRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class InsuranceService {

    private final InsuranceRepository insuranceRepository;

    public Insurance saveInsurance(Insurance insurance) {
        //TODO sprawdzanie czy ubezpieczenie w danym zakresie dat istnieje, jesli tak exception oraz wyliczenie dat zaplaty paymentDeadlines
        return insuranceRepository.save(insurance);
    }

    public List<Insurance> getInsurancesByVehicleId(String vehicleId) {
        return insuranceRepository.findAllByVehicleId(vehicleId).stream()
                .sorted(Comparator.comparing(Insurance::getDateFrom, Comparator.reverseOrder()))
                .collect(Collectors.toList());
    }

}
