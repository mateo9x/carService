package com.mateo9x.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "vehicle_coordinates")
public class VehicleCoordinate {

    @Id
    private String id;
    private String vehicleId;
    private Float latitude;
    private Float longitude;
    private LocalDateTime time;
}
