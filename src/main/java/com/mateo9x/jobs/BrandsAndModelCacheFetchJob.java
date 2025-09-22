package com.mateo9x.jobs;

import com.mateo9x.cache.CarServiceCache;
import com.mateo9x.clients.DictionaryApiClientService;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@AllArgsConstructor
public class BrandsAndModelCacheFetchJob {
    private static final String BRAND_AND_MODEL_CACHE_NAME = "brandAndModels";

    private final DictionaryApiClientService apiClient;
    private final CarServiceCache<DictionaryApiClientService.BrandModelResponse> carServiceCache;

    // once a month and once at spring context ready
    @Scheduled(cron = "0 0 0 1 * *")
    public void fetchBrandsAndModels() {
        List<DictionaryApiClientService.BrandModelResponse> response = apiClient.fetchBrandAndModels();
        if (!response.isEmpty()) {
            carServiceCache.invalidateCache(BRAND_AND_MODEL_CACHE_NAME);
            carServiceCache.setCacheValues(BRAND_AND_MODEL_CACHE_NAME, response);
        }
    }
}
