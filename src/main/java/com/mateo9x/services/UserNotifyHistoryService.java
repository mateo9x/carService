package com.mateo9x.services;

import com.mateo9x.entities.UserNotifyHistory;
import com.mateo9x.enums.NotifyType;
import com.mateo9x.repositories.UserNotifyHistoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserNotifyHistoryService {

    private final UserNotifyHistoryRepository userNotifyHistoryRepository;

    public Optional<UserNotifyHistory> findUserNotifyHistoryByNotifyTypeAndForeignId(NotifyType notifyType, String foreignId) {
        return userNotifyHistoryRepository.findByNotifyTypeAndNotifyForeignId(notifyType, foreignId);
    }

    public void saveUserNotifyHistory(UserNotifyHistory userNotifyHistory) {
        userNotifyHistoryRepository.save(userNotifyHistory);
    }
}
