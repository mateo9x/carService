package com.mateo9x.jobs;

import com.mateo9x.cache.CarServiceCache;
import com.mateo9x.clients.DictionaryApiClientService;
import com.mateo9x.clients.model.MakeNameDictResponse;
import lombok.AllArgsConstructor;
import lombok.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@AllArgsConstructor
public class MakesNamesFetchJob {
    private static final String CAR_MAKES_CACHE_NAME = "carMakes";
    private static final String CAR_NAMES_CACHE_NAME = "carNames";

    private final DictionaryApiClientService apiClient;
    private final CarServiceCache carServiceCache;

    // once a month and once at spring context ready
    @Scheduled(cron = "0 0 0 1 * *")
    public void fetchCarMakesAndNames() {
        List<MakeNameDictResponse> response = apiClient.fetchCarMakesAndNamesDict();
        if (!response.isEmpty()) {
            carServiceCache.invalidateCache(CAR_MAKES_CACHE_NAME);
            carServiceCache.invalidateCache(CAR_NAMES_CACHE_NAME);
            List<Object> carMakeList = response.stream()
                    .map(dictResponse -> (Object) CarMake.of(dictResponse.getMakeId(), dictResponse.getMake()))
                    .distinct()
                    .toList();
            List<Object> carNameList = response.stream()
                    .map(dictResponse -> (Object) CarName.of(dictResponse.getMakeId(), dictResponse.getName()))
                    .distinct()
                    .toList();
            carServiceCache.setCacheValues(CAR_MAKES_CACHE_NAME, carMakeList);
            carServiceCache.setCacheValues(CAR_NAMES_CACHE_NAME, carNameList);
        }
    }

    @Value(staticConstructor = "of")
    static class CarMake {
        Long makeId;
        String make;
    }

    @Value(staticConstructor = "of")
    static class CarName {
        Long makeId;
        String name;
    }

}
