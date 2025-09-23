package com.mateo9x.clients.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class MakeNameDictResponse {
    @JsonProperty("make_id")
    private Long makeId;
    private String make;
    private String name;
}
