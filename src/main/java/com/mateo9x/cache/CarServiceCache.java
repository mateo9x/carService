package com.mateo9x.cache;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class CarServiceCache<T> {

    private final Cache<String, List<T>> CACHE = Caffeine.newBuilder().build();

    public List<T> getCacheValues(String cacheName) {
        log.info("Getting cache for key: {}", cacheName);
        return CACHE.getIfPresent(cacheName);
    }

    public void invalidateCache(String cacheName) {
        log.info("Invalidating cache for key: {}", cacheName);
        CACHE.invalidate(cacheName);
    }

    public void setCacheValues(String cacheName, List<T> values) {
        log.info("Setting cache for key: {}", cacheName);
        CACHE.put(cacheName, values);
    }

}
