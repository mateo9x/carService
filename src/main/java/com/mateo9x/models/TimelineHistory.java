package com.mateo9x.models;

import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;

@Data
@Builder
public class TimelineHistory {
    private Integer id;
    private Timestamp timestamp;
    private String title;
    private String description;
    private TimeLineHistoryItemPosition itemPosition;

    public enum TimeLineHistoryItemPosition {
        ON_LEFT,
        ON_RIGHT
    }
}
