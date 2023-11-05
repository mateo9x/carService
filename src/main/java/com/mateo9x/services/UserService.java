package com.mateo9x.services;

import com.mateo9x.authentication.AuthenticationFacade;
import com.mateo9x.converters.UserConverter;
import com.mateo9x.dtos.UserDto;
import com.mateo9x.entities.User;
import com.mateo9x.entities.Vehicle;
import com.mateo9x.models.Authority;
import com.mateo9x.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserService {

    private static final int DAYS_TILL_RESET_TOKEN_EXPIRE = 3;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationFacade authenticationFacade;
    private final UserConverter userConverter;
    private final MailService mailService;

    public Boolean isUserByEmailPresent(String email) {
        return findUserByEmail(email).isPresent();
    }

    public UserDto getUserByEmail(String email) {
        return userConverter.toDto(findUserByEmail(email).orElse(null));
    }

    public UserDto saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles(Authority.USER.getAuthority());
        mailService.sendNewUserMail(user);
        return userConverter.toDto(userRepository.save(user));
    }

    public void addVehicleToLoggedUser(Vehicle vehicle) {
        Optional<User> userOptional = findUserByEmail(authenticationFacade.getCurrentUser().getUsername());
        userOptional.ifPresentOrElse(user -> addVehicleToLoggedUser(user, vehicle), () -> {
            throw new UsernameNotFoundException("Użytkownik nie został znaleziony!");
        });
    }

    public void updatePassword(String newPassword) {
        Optional<User> userOptional = findUserByEmail(authenticationFacade.getCurrentUser().getUsername());
        userOptional.ifPresentOrElse(user -> updatePassword(user, newPassword), () -> {
            throw new UsernameNotFoundException("Użytkownik nie został znaleziony!");
        });
    }

    @Transactional
    public void startResetPasswordProcedure(String email) {
        Optional<User> userOptional = findUserByEmail(email);
        userOptional.ifPresentOrElse(this::startResetPasswordProcedure, () -> {
            throw new UsernameNotFoundException("Użytkownik z podanym adresem email nie istnieje!");
        });
    }

    public Boolean isResetPasswordTokenValid(String token) {
        Optional<User> userOptional = findUserByRestPasswordToken(token);
        if (userOptional.isPresent()) {
            return isResetPasswordTokenValid(userOptional.get());
        }
        throw new UsernameNotFoundException("Token stracił swoją ważność!");
    }

    public void finishResetPasswordProcedure(String token, String newPassword) {
        Optional<User> userOptional = findUserByRestPasswordToken(token);
        if (userOptional.isPresent()) {
            finishResetPasswordProcedure(userOptional.get(), newPassword);
        } else {
            throw new UsernameNotFoundException("Token stracił swoją ważność!");
        }
    }

    public Optional<User> getUserLogged() {
        String email = authenticationFacade.getCurrentUser().getUsername();
        return userRepository.findByEmail(email);
    }

    private void finishResetPasswordProcedure(User user, String newPassword) {
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetPasswordToken(null);
        user.setResetPasswordTokenExpire(null);
        userRepository.save(user);
    }

    private Optional<User> findUserByRestPasswordToken(String token) {
        return userRepository.findByResetPasswordToken(token);
    }

    private Boolean isResetPasswordTokenValid(User user) {
        return LocalDateTime.now().isBefore(user.getResetPasswordTokenExpire());
    }

    private void startResetPasswordProcedure(User user) {
        UUID uuid = UUID.randomUUID();
        user.setResetPasswordToken(uuid.toString());
        user.setResetPasswordTokenExpire(LocalDateTime.now().plusDays(DAYS_TILL_RESET_TOKEN_EXPIRE));
        userRepository.save(user);
        mailService.sendResetPasswordUrl(user);
    }

    private void updatePassword(User user, String newPassword) {
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    private Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    private void addVehicleToLoggedUser(User user, Vehicle vehicle) {
        user.getVehicles().add(vehicle);
        userRepository.save(user);
    }
}
