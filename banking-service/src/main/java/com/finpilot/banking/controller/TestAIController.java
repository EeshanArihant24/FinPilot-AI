package com.finpilot.banking.controller;

import com.finpilot.banking.dto.PredictionRequest;
import com.finpilot.banking.dto.PredictionResponse;
import com.finpilot.banking.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class TestAIController {

    @Autowired
    private AIService aiService;

    @PostMapping("/test-ai")
    public PredictionResponse predict(@RequestBody PredictionRequest request) {

        return aiService.predict(request);

    }
}