package com.mateo9x.converters;

import com.mateo9x.dtos.UserDto;
import com.mateo9x.entities.User;
import org.springframework.stereotype.Component;

@Component
public class UserConverter {

    public UserDto toDto(User user) {
        if (user == null) {
            return null;
        }
        return UserDto.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .roles(user.getRoles())
                .vehicles(user.getVehicles())
                .build();
    }
}
