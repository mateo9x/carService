package com.mateo9x.authentication;

import lombok.Data;

@Data
public class AuthenticationRequest {
    private String email;
    private String password;
}
