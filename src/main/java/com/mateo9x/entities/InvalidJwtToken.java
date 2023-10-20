package com.mateo9x.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "invalid_jwt_tokens")
public class InvalidJwtToken {
    @Id
    private String id;
    private String jwt;
    private LocalDateTime invalidatedDateTime;
    private LocalDateTime expirationDateTime;
}