package com.mateo9x.services;

import com.mateo9x.config.AppProperties;
import com.mateo9x.dtos.KafkaMailDto;
import com.mateo9x.dtos.UserDto;
import com.mateo9x.entities.Inspection;
import com.mateo9x.entities.User;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

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

    public void sendResetPasswordUrl(User user) {
        String url = appProperties.getAppUrl() + "/(nonAuthenticated:new-password)?" + user.getResetPasswordToken();
        String userFullName = user.getFirstName() + " " + user.getLastName();
        final String subject = EMAIL_SUBJECT_PREFIX + "Resetowanie hasła";
        final String message = "Witaj " + userFullName + "!\n\nPoniżej znajduje się link do zresetowania hasła:\n\n" + url;

        KafkaMailDto kafkaMailDto = prepareKafkaMail(user.getEmail(), subject, message, null);
        sendMessageOnKafka(kafkaMailDto);
    }

    public void sendNewUserMail(User user) {
        String userFullName = user.getFirstName() + " " + user.getLastName();
        final String subject = EMAIL_SUBJECT_PREFIX + "Rejestracja konta";
        final String message = "Witaj " + userFullName + "!\n\nTwoje konto w aplikacji Car Service zostało pomyślnie zarejestrowane.\n\nPozdrawiamy :)";

        KafkaMailDto kafkaMailDto = prepareKafkaMail(user.getEmail(), subject, message, null);
        sendMessageOnKafka(kafkaMailDto);
    }

    public void sendInspectionNotify(UserDto user, Inspection inspection, String vehicleName) {
        String userFullName = user.getFirstName() + " " + user.getLastName();
        final String subject = EMAIL_SUBJECT_PREFIX + "Przegląd";
        final String message = "Witaj " + userFullName + String.format("!\n\nZbliża się termin wykonania przeglądu pojazdu %s.\nNajbliższy przegląd przy przebiegu: %s\n\nPozdrawiamy :)", vehicleName, inspection.getNextServiceMileage().toString());

        KafkaMailDto kafkaMailDto = prepareKafkaMail(user.getEmail(), subject, message, null);
        sendMessageOnKafka(kafkaMailDto);
    }

    public void sendSchedulerEventNotify(UserDto user, String vehicleName) {
        String userFullName = user.getFirstName() + " " + user.getLastName();
        final String subject = EMAIL_SUBJECT_PREFIX + "Przypomnienie";
        final String message = "Witaj " + userFullName + String.format("!\n\nZbliża się termin wydarzenia dla pojazdu %s.\n\nPozdrawiamy :)", vehicleName);

        KafkaMailDto kafkaMailDto = prepareKafkaMail(user.getEmail(), subject, message, null);
        sendMessageOnKafka(kafkaMailDto);
    }

    public void sendInsuranceNotify(UserDto user, LocalDate upcomingPaymentDeadline, String vehicleName) {
        String userFullName = user.getFirstName() + " " + user.getLastName();
        final String subject = EMAIL_SUBJECT_PREFIX + "Ubezpieczenie";
        final String message = "Witaj " + userFullName + String.format("!\n\nZbliża się termin zapłaty ubezpieczenia dla pojazdu %s.\nData najbliższej spłaty: %s\n\nPozdrawiamy :)", vehicleName, upcomingPaymentDeadline);

        KafkaMailDto kafkaMailDto = prepareKafkaMail(user.getEmail(), subject, message, null);
        sendMessageOnKafka(kafkaMailDto);
    }

    private void sendMessageOnKafka(KafkaMailDto kafkaMailDto) {
        kafkaService.sendMessage(EMAIL_TOPIC_NAME, kafkaMailDto);
    }

    private KafkaMailDto prepareKafkaMail(String to, String subject, String message, String templatePath) {
        return KafkaMailDto.builder()
                .from(EMAIL_FROM)
                .to(to)
                .subject(subject)
                .message(message)
                .templatePath(templatePath)
                .build();
    }
}