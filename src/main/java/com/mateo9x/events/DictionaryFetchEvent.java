package com.mateo9x.events;

import com.mateo9x.jobs.MakesNamesFetchJob;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DictionaryFetchEvent {

    private final MakesNamesFetchJob fetchJob;

    @EventListener(ApplicationReadyEvent.class)
    public void onApplicationEvent() {
        fetchJob.fetchCarMakesAndNames();
    }
}
