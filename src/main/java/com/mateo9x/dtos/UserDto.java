package com.mateo9x.dtos;

import com.mateo9x.entities.Vehicle;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class UserDto {
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String roles;
    private List<Vehicle> vehicles;
}
