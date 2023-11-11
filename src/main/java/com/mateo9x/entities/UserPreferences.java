package com.mateo9x.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "user_preferences")
public class UserPreferences {

    @Id
    private String id;
    private String userId;
    private Boolean notifyInsurance;
    private Integer daysBeforeInsuranceExpire;
    private Boolean notifyInspections;
    private Integer mileageBeforeInspectionExpire;
}
