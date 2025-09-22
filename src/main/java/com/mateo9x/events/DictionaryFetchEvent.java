package com.mateo9x.events;

import com.mateo9x.cache.CarServiceCache;
import com.mateo9x.clients.DictionaryApiClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DictionaryFetchEvent {
    private static final String BRAND_AND_MODEL_CACHE_NAME = "brandAndModels";

    private final DictionaryApiClientService clientService;
    private final CarServiceCache<DictionaryApiClientService.BrandModelResponse> carServiceCache;

    @EventListener(ApplicationReadyEvent.class)
    public void onApplicationEvent() {
        List<DictionaryApiClientService.BrandModelResponse> response = clientService.fetchBrandAndModels();
        if (!response.isEmpty()) {
            carServiceCache.invalidateCache(BRAND_AND_MODEL_CACHE_NAME);
            carServiceCache.setCacheValues(BRAND_AND_MODEL_CACHE_NAME, response);
        }
    }
}
