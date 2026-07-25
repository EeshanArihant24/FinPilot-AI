package com.finpilot.banking.service.impl;

import com.finpilot.banking.entity.Account;
import com.finpilot.banking.repository.AccountRepository;
import com.finpilot.banking.service.AccountService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;

    public AccountServiceImpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public Account createAccount(Account account) {
        return accountRepository.save(account);
    }

    @Override
    public Account getAccount(Long id) {
        return accountRepository.findById(id).orElse(null);
    }

    @Override
    public BigDecimal getBalance(Long id) {
        Account account = accountRepository.findById(id).orElse(null);

        if (account == null) {
            return null;
        }

        return account.getBalance();
    }
}