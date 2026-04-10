package com.jobtracker.dto.company;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CompanyRequest {
    @NotBlank(message = "Company name is required")
    private String name;
    
    private String description;
    private String website;
    private String industry;
    private String location;
    private String logoUrl;
    private String careersPageUrl;
}
