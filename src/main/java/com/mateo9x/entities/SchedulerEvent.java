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
@Document(collection = "scheduler_events")
public class SchedulerEvent {

    @Id
    private String id;
    private String vehicleId;
    private LocalDate day;
    private String time;
    private String info;
    private Boolean notify;
    private Integer notifyTimeBefore;
}