package com.mateo9x.services;

import com.mateo9x.entities.UserAuthentication;
import com.mateo9x.repositories.UserAuthenticationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.List;


@Service
@RequiredArgsConstructor
public class UserAuthenticationService {

    private final UserAuthenticationRepository userAuthenticationRepository;

    public long getUserAuthenticationLoggedTimeInDays(String userId) {
        long days = 0;
        List<UserAuthentication> userAuthentications = userAuthenticationRepository.findAllByUserId(userId);
        if (!userAuthentications.isEmpty()) {
            LocalDateTime lastAuthentication = userAuthentications.stream()
                    .sorted(Comparator.comparing(UserAuthentication::getAuthenticationDateTime, Comparator.reverseOrder()))
                    .map(UserAuthentication::getAuthenticationDateTime)
                    .findFirst()
                    .orElse(LocalDateTime.now());
            days = ChronoUnit.DAYS.between(lastAuthentication, LocalDateTime.now());
        }
        return days;
    }
    public void saveUserAuthentication(UserAuthentication userAuthentication) {
        userAuthenticationRepository.save(userAuthentication);
    }
}
