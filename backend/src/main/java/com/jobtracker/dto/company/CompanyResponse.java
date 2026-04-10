package com.jobtracker.dto.company;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CompanyResponse {
    private Long id;
    private String name;
    private String description;
    private String website;
    private String industry;
    private String location;
    private String logoUrl;
    private String careersPageUrl;
    private Long createdById;
    private String createdAt;
}
