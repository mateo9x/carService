package com.mateo9x.repositories;

import com.mateo9x.entities.UserNotifyHistory;
import com.mateo9x.enums.NotifyType;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserNotifyHistoryRepository extends MongoRepository<UserNotifyHistory, String> {

    Optional<UserNotifyHistory> findByNotifyTypeAndNotifyForeignId(NotifyType notifyType, String notifyForeignId);
}
