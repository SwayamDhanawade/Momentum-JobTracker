package com.jobtracker.dto.application;

import lombok.Data;

@Data
public class StatusUpdateRequest {
    private Long statusId;
    private String notes;
}
