package com.mateo9x.controllers;

import com.mateo9x.cache.CarServiceCache;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/cache")
@AllArgsConstructor
public class CacheController {

    private final CarServiceCache<Object> carServiceCache;

    @GetMapping("/{cacheKey}")
    public ResponseEntity<List<Object>> getCacheDictByKey(@PathVariable String cacheKey) {
        log.info("REST request to get cache by key: {}", cacheKey);
        return ResponseEntity.ok(carServiceCache.getCacheValues(cacheKey));
    }
}
