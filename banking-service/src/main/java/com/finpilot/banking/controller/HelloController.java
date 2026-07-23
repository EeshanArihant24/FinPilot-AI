package com.finpilot.banking.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/")
    public String home() {
        return "FinPilot AI Banking Service is Running!";
    }

    @GetMapping("/api/hello")
    public String hello() {
        return "Hello from FinPilot AI!";
    }
}