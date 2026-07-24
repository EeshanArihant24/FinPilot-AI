package com.finpilot.banking.service;

import com.finpilot.banking.entity.Account;

public interface AccountService {

    Account createAccount(Account account);

    Account getAccount(Long id);

    Double getBalance(Long id);
}