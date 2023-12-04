package com.mateo9x.services;

import com.mateo9x.config.AppProperties;
import com.mateo9x.dtos.UserDto;
import com.mateo9x.entities.Inspection;
import com.mateo9x.entities.User;
import com.mateo9x.exceptions.EmailException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Slf4j
@Service
@AllArgsConstructor
public class MailService {

    private final JavaMailSender javaMailSender;
    private final AppProperties appProperties;

    public void sendResetPasswordUrl(User user) {
        String url = appProperties.getAppUrl() + "/(nonAuthenticated:new-password)?" + user.getResetPasswordToken();
        String userFullName = user.getFirstName() + " " + user.getLastName();
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@carservice.pl");
        message.setTo(user.getEmail());
        message.setSubject("Car Service - Resetowanie hasła");
        message.setText("Witaj " + userFullName + "!\n\nPoniżej znajduje się link do zresetowania hasła:\n\n" + url);
        try {
            javaMailSender.send(message);
        } catch (Exception e) {
            log.warn("Nie udało się wysłać maila resetującego hasła dla użytkownika: {}, z powodu: {}", user.getEmail(), e.getMessage());
            throw new EmailException("Nie udało się wysłać maila resetującego hasła");
        }
    }

    public void sendNewUserMail(User user) {
        String userFullName = user.getFirstName() + " " + user.getLastName();
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@carservice.pl");
        message.setTo(user.getEmail());
        message.setSubject("Car Service - Rejestracja konta");
        message.setText("Witaj " + userFullName + "!\n\nTwoje konto w aplikacji Car Service zostało pomyślnie zarejestrowane.\n\nPozdrawiamy :)");
        try {
            javaMailSender.send(message);
        } catch (Exception e) {
            log.warn("Nie udało się wysłać maila powitalnego dla użytkownika: {}, z powodu: {}", user.getEmail(), e.getMessage());
        }
    }

    public void sendInspectionNotify(UserDto user, Inspection inspection, String vehicleName) {
        String userFullName = user.getFirstName() + " " + user.getLastName();
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@carservice.pl");
        message.setTo(user.getEmail());
        message.setSubject("Car Service - Przegląd");
        message.setText("Witaj " + userFullName + String.format("!\n\nZbliża się termin wykonania przeglądu pojazdu %s.\nNajbliższy przegląd przy przebiegu: %s\n\nPozdrawiamy :)", vehicleName, inspection.getNextServiceMileage().toString()));
        try {
            javaMailSender.send(message);
        } catch (Exception e) {
            log.warn("Nie udało się wysłać maila dotyczącego przeglądu dla użytkownika: {} i pojazdu: {}, z powodu: {}", user.getEmail(), vehicleName, e.getMessage());
        }
    }

    public void sendSchedulerEventNotify(UserDto user, String vehicleName) {
        String userFullName = user.getFirstName() + " " + user.getLastName();
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@carservice.pl");
        message.setTo(user.getEmail());
        message.setSubject("Car Service - Przypomnienie");
        message.setText("Witaj " + userFullName + String.format("!\n\nZbliża się termin wydarzenia dla pojazdu %s.\n\nPozdrawiamy :)", vehicleName));
        try {
            javaMailSender.send(message);
        } catch (Exception e) {
            log.warn("Nie udało się wysłać maila dotyczącego przypomnienia dla użytkownika: {} i pojazdu: {}, z powodu: {}", user.getEmail(), vehicleName, e.getMessage());
        }
    }

    public void sendInsuranceNotify(UserDto user, LocalDate upcomingPaymentDeadline, String vehicleName) {
        String userFullName = user.getFirstName() + " " + user.getLastName();
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@carservice.pl");
        message.setTo(user.getEmail());
        message.setSubject("Car Service - Ubezpieczenie");
        message.setText("Witaj " + userFullName + String.format("!\n\nZbliża się termin zapłaty ubezpieczenia dla pojazdu %s.\nData najbliższej spłaty: %s\n\nPozdrawiamy :)", vehicleName, upcomingPaymentDeadline));

        try {
            javaMailSender.send(message);
        } catch (Exception e) {
            log.warn("Nie udało się wysłać maila dotyczącego ubezpiczenia dla użytkownika: {} i pojazdu: {}, z powodu: {}", user.getEmail(), vehicleName, e.getMessage());
        }
    }
}