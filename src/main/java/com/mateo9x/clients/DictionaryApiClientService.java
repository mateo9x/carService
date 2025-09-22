package com.mateo9x.clients;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mongodb.BasicDBObject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DictionaryApiClientService {

    private final RestClient modelsApiClient;

    public List<BrandModelResponse> fetchBrandAndModels() {
        return (List<BrandModelResponse>) modelsApiClient
                .get()
                .uri("/models/v2")
                .retrieve()
                .body(BasicDBObject.class)
                .get("data");
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class BrandModelResponse {
        private Long id;
        @JsonProperty("make_id")
        private Long brandId;
        @JsonProperty("make")
        private String brand;
        @JsonProperty("name")
        private String model;
    }

}
