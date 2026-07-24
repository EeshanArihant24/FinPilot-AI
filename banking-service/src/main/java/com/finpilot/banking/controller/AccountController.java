package com.finpilot.banking.controller;

import com.finpilot.banking.entity.Account;
import com.finpilot.banking.service.AccountService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping
    public Account createAccount(@RequestBody Account account){
        return accountService.createAccount(account);
    }

    @GetMapping("/{id}")
    public Account getAccount(@PathVariable Long id){
        return accountService.getAccount(id);
    }

    @GetMapping("/{id}/balance")
    public Double getBalance(@PathVariable Long id){
        return accountService.getBalance(id);
    }
}