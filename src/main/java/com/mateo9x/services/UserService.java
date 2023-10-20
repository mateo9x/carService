package com.mateo9x.services;

import com.mateo9x.authentication.AuthenticationFacade;
import com.mateo9x.entities.User;
import com.mateo9x.entities.Vehicle;
import com.mateo9x.models.Authority;
import com.mateo9x.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationFacade authenticationFacade;

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles(Authority.USER.getAuthority());
        return userRepository.save(user);
    }

    public void addVehicleToLoggedUser(Vehicle vehicle) {
        Optional<User> userOptional = getUserByEmail(authenticationFacade.getCurrentUser().getUsername());
        userOptional.ifPresentOrElse(user -> addVehicleToLoggedUser(user, vehicle), () -> {
            throw new UsernameNotFoundException("Użytkownik nie został znaleziony!");
        });
    }

    private void addVehicleToLoggedUser(User user, Vehicle vehicle) {
        user.getVehicles().add(vehicle);
        userRepository.save(user);
    }
}
