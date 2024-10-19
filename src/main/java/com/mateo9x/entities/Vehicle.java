package com.mateo9x.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;

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
    private List<String> attachmentsNames;
    private List<URI> attachmentsUri;
}
