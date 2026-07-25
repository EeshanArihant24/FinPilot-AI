package com.finpilot.banking.service;

import com.finpilot.banking.dto.TransactionResponse;

import java.math.BigDecimal;
import java.util.List;

public interface TransactionService {

    TransactionResponse deposit(Long accountId, BigDecimal amount);

    TransactionResponse withdraw(Long accountId, BigDecimal amount);

    TransactionResponse transfer(Long fromAccountId,
                                 Long toAccountId,
                                 BigDecimal amount);

    List<TransactionResponse> getTransactionHistory(Long accountId);
}