package com.mateo9x.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "inspections")
public class Inspection {

    @Id
    private String id;
    private String vehicleId;
    private LocalDate date;
    private Boolean oilChanged;
    private Boolean oilFilterChanged;
    private String oilType;
    private Boolean fuelFilterChanged;
    private Boolean sparkPlugChanged;
    private Boolean airFilterChanged;
    private Boolean cabinFilterChanged;
    private String additionalInfo;
    private Long currentMileage;
    private Long nextServiceMileage;
}