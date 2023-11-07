package com.mateo9x.controllers.response;

import lombok.Value;

@Value(staticConstructor = "of")
public class JwtTokenResponse {
    String jwt;
    long daysSinceLastAuthentication;
}
