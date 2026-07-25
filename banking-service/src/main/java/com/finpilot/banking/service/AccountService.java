package com.finpilot.banking.service;

import com.finpilot.banking.entity.Account;

import java.math.BigDecimal;

public interface AccountService {

    Account createAccount(Account account);

    Account getAccount(Long id);

    BigDecimal getBalance(Long id);
}