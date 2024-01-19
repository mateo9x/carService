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
@Document(collection = "vehicles")
public class Vehicle {

    @Id
    private String id;
    private String brand;
    private String model;
    private Integer productionYear;
    private String licensePlate;
    private String vin;
    private LocalDate purchaseDate;
    private String engineType;
    private String transmissionType;
    private Long purchaseMileage;
    private Boolean active;
}
