package com.mateo9x.services;

import com.mateo9x.config.AppProperties;
import com.mateo9x.entities.User;
import com.mateo9x.exceptions.EmailException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@AllArgsConstructor
public class MailService {

    private final JavaMailSender javaMailSender;
    private final AppProperties appProperties;

    public void sendResetPasswordUrl(User user) {
        String url = appProperties.getAppUrl() + "/new-password?" + user.getResetPasswordToken();
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
}