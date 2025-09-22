package com.mateo9x.events;

import com.mateo9x.jobs.BrandsAndModelFetchJob;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DictionaryFetchEvent {

    private final BrandsAndModelFetchJob fetchJob;

    @EventListener(ApplicationReadyEvent.class)
    public void onApplicationEvent() {
        fetchJob.fetchBrandsAndModels();
    }
}
