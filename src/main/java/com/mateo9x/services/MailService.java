package com.mateo9x.services;

import com.mateo9x.config.AppProperties;
import com.mateo9x.dtos.KafkaMailDto;
import com.mateo9x.dtos.UserDto;
import com.mateo9x.entities.Inspection;
import com.mateo9x.entities.User;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Map;

/*
    Class preparing templates with messages and sending them on kafka to mail-microservice
 */
@Slf4j
@Service
@AllArgsConstructor
public class MailService {

    private static final String EMAIL_TOPIC_NAME = "emails";
    private static final String EMAIL_FROM = "noreply@carservice.pl";
    private static final String EMAIL_SUBJECT_PREFIX = "Car Service - ";

    private final AppProperties appProperties;
    private final KafkaService kafkaService;
    private final Environment environment;

    public void sendResetPasswordUrl(User user) {
        String url = appProperties.getAppUrl() + "/(nonAuthenticated:new-password)?" + user.getResetPasswordToken();
        final String subject = EMAIL_SUBJECT_PREFIX + "Resetowanie hasła";
        final Map<String, String> replacementStrings = Map.of("FIRSTNAME", user.getFirstName(),
                "LASTNAME", user.getLastName(),
                "RESET_PASSWORD_URL", url);

        KafkaMailDto kafkaMailDto = prepareKafkaMail(user.getEmail(), subject, null, "carservice/resetpassword", replacementStrings);
        sendMessageOnKafka(kafkaMailDto);
    }

    public void sendNewUserMail(User user) {
        String userFullName = user.getFirstName() + " " + user.getLastName();
        final String subject = EMAIL_SUBJECT_PREFIX + "Rejestracja konta";
        final String message = "Witaj " + userFullName + "!\n\nTwoje konto w aplikacji Car Service zostało pomyślnie zarejestrowane.\n\nPozdrawiamy :)";

        KafkaMailDto kafkaMailDto = prepareKafkaMail(user.getEmail(), subject, message, null, null);
        sendMessageOnKafka(kafkaMailDto);
    }

    public void sendInspectionNotify(UserDto user, Inspection inspection, String vehicleName) {
        String userFullName = user.getFirstName() + " " + user.getLastName();
        final String subject = EMAIL_SUBJECT_PREFIX + "Przegląd";
        final String message = "Witaj " + userFullName + String.format("!\n\nZbliża się termin wykonania przeglądu pojazdu %s.\nNajbliższy przegląd przy przebiegu: %s\n\nPozdrawiamy :)", vehicleName, inspection.getNextServiceMileage().toString());

        KafkaMailDto kafkaMailDto = prepareKafkaMail(user.getEmail(), subject, message, null, null);
        sendMessageOnKafka(kafkaMailDto);
    }

    public void sendSchedulerEventNotify(UserDto user, String vehicleName) {
        String userFullName = user.getFirstName() + " " + user.getLastName();
        final String subject = EMAIL_SUBJECT_PREFIX + "Przypomnienie";
        final String message = "Witaj " + userFullName + String.format("!\n\nZbliża się termin wydarzenia dla pojazdu %s.\n\nPozdrawiamy :)", vehicleName);

        KafkaMailDto kafkaMailDto = prepareKafkaMail(user.getEmail(), subject, message, null, null);
        sendMessageOnKafka(kafkaMailDto);
    }

    public void sendInsuranceNotify(UserDto user, LocalDate upcomingPaymentDeadline, String vehicleName) {
        String userFullName = user.getFirstName() + " " + user.getLastName();
        final String subject = EMAIL_SUBJECT_PREFIX + "Ubezpieczenie";
        final String message = "Witaj " + userFullName + String.format("!\n\nZbliża się termin zapłaty ubezpieczenia dla pojazdu %s.\nData najbliższej spłaty: %s\n\nPozdrawiamy :)", vehicleName, upcomingPaymentDeadline);

        KafkaMailDto kafkaMailDto = prepareKafkaMail(user.getEmail(), subject, message, null, null);
        sendMessageOnKafka(kafkaMailDto);
    }

    private void sendMessageOnKafka(KafkaMailDto kafkaMailDto) {
        Arrays.stream(environment.getActiveProfiles())
                .filter("kafka"::equals)
                .findFirst()
                .ifPresent(profile -> kafkaService.sendMessage(EMAIL_TOPIC_NAME, kafkaMailDto));
    }

    private KafkaMailDto prepareKafkaMail(String to, String subject, String message, String templatePath, Map<String, String> replacementStrings) {
        return KafkaMailDto.builder()
                .from(EMAIL_FROM)
                .to(to)
                .subject(subject)
                .message(message)
                .templatePath(templatePath)
                .replacementStrings(replacementStrings)
                .build();
    }
}