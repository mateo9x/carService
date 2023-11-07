package com.mateo9x.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "user_authentications")
public class UserAuthentication {
    @Id
    private String id;
    private String userId;
    private LocalDateTime authenticationDateTime;
}
