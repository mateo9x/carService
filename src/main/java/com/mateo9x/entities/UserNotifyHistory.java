package com.mateo9x.entities;

import com.mateo9x.enums.NotifyType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "user_notify_histories")
public class UserNotifyHistory {

    @Id
    private String id;
    private String userId;
    private NotifyType notifyType;
    private String notifyForeignId;
}

