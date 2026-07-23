package com.finpilot.banking.service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.finpilot.banking.dto.*;

@Service
public class AIService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${ai.service.url}")
    private String fastApiUrl;

    public PredictionResponse predict(PredictionRequest request) {
        return restTemplate.postForObject(
                fastApiUrl,
                request,
                PredictionResponse.class
        );
    }
}