package com.mateo9x.clients;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mateo9x.clients.model.MakeNameDictResponse;
import com.mongodb.BasicDBObject;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DictionaryApiClientService {

    private final RestClient modelsApiClient;
    private final ObjectMapper objectMapper;

    public List<MakeNameDictResponse> fetchCarMakesAndNamesDict() {
        Object response = modelsApiClient
                .get()
                .uri("/models/v2")
                .retrieve()
                .body(BasicDBObject.class)
                .get("data");
        return objectMapper.convertValue(response, new TypeReference<>() {});
    }

}
