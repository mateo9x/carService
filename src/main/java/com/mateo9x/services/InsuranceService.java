package com.mateo9x.services;

import com.mateo9x.entities.Insurance;
import com.mateo9x.exceptions.InsuranceException;
import com.mateo9x.repositories.InsuranceRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class InsuranceService {
    private static final Integer LOAN_PART_1 = 1;
    private static final Integer LOAN_PART_2 = 2;
    private final InsuranceRepository insuranceRepository;

    public Insurance saveInsurance(Insurance insurance) {
        if (insuranceRepository.findByDatesBetween(insurance.getDateFrom(), insurance.getDateTo()).isPresent()) {
            throw new InsuranceException("Ubezpieczenie dla tego pojazdu istnieje w wybranym okresie");
        }
        if (insurance.getDateFrom().isAfter(LocalDate.now())) {
            insurance.setPaymentDeadlines(preparePaymentDeadlines(insurance));
        }
        return insuranceRepository.save(insurance);
    }

    public List<Insurance> getInsurancesByVehicleId(String vehicleId) {
        return insuranceRepository.findAllByVehicleId(vehicleId).stream()
                .sorted(Comparator.comparing(Insurance::getDateFrom, Comparator.reverseOrder()))
                .collect(Collectors.toList());
    }

    public void deleteInsuranceById(String id) {
        insuranceRepository.deleteById(id);
    }

    private List<LocalDate> preparePaymentDeadlines(Insurance insurance) {
        List<LocalDate> dates = new ArrayList<>();
        if (LOAN_PART_1.equals(insurance.getLoanPartsAmount())) {
            dates.add(insurance.getDateFrom().plusDays(14));
        } else if (LOAN_PART_2.equals(insurance.getLoanPartsAmount())) {
            dates.add(insurance.getDateFrom().plusDays(14));
            dates.add(insurance.getDateFrom().plusMonths(6));
        } else {
            dates.add(insurance.getDateFrom().plusDays(14));
            dates.add(insurance.getDateFrom().plusMonths(3));
            dates.add(insurance.getDateFrom().plusMonths(6));
            dates.add(insurance.getDateFrom().plusMonths(9));
        }
        return dates;
    }

}
