package com.mateo9x.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "insurances")
public class Insurance {

    @Id
    private String id;
    private String vehicleId;
    private LocalDate dateFrom;
    private LocalDate dateTo;
    private String company;
    private Integer loanPartsAmount;
    private List<LocalDate> paymentDeadlines;
    private Boolean assistance;
    private Boolean ac;
    private List<String> acProtectionTypes;
}