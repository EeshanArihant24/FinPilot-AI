package com.finpilot.banking.service.impl;

import com.finpilot.banking.entity.Account;
import com.finpilot.banking.repository.AccountRepository;
import com.finpilot.banking.service.AccountService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public Account createAccount(Account account) {
        return accountRepository.save(account);
    }

    @Override
    public Account getAccount(Long id) {
        return accountRepository.findById(id).orElse(null);
    }

    @Override
    public Double getBalance(Long id) {
        Account account = accountRepository.findById(id).orElse(null);

        if (account == null) {
            return null;
        }

        return account.getBalance();
    }
}