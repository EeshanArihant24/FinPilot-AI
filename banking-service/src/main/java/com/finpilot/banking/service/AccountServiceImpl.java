package com.finpilot.banking.service.impl;

import com.finpilot.banking.entity.Account;
import com.finpilot.banking.repository.AccountRepository;
import com.finpilot.banking.service.AccountService;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;

import com.finpilot.banking.repository.TransactionRepository;

@Service
public class AccountServiceImpl implements AccountService {

    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;

    @Override
public DashboardResponse getDashboard(User user) {

    Account account = accountRepository.findByUser(user)
            .orElseThrow(() -> new RuntimeException("Account not found"));

    DashboardResponse response = new DashboardResponse();

    response.setAccountNumber(account.getAccountNumber());
    response.setAccountType(account.getAccountType());
    response.setBalance(account.getBalance());

    List<TransactionResponse> transactions =
            transactionRepository
                    .findTop5ByAccountIdOrderByCreatedAtDesc(account.getId())
                    .stream()
                    .map(tx -> {

                        TransactionResponse dto = new TransactionResponse();

                        dto.setTransactionId(tx.getId());
                        dto.setReferenceNumber(tx.getReferenceNumber());
                        dto.setTransactionType(tx.getTransactionType().name());
                        dto.setStatus(tx.getStatus().name());
                        dto.setAmount(tx.getAmount());
                        dto.setDescription(tx.getDescription());
                        dto.setCreatedAt(tx.getCreatedAt());

                        return dto;

                    }).toList();

    response.setRecentTransactions(transactions);

    return response;
}

    public AccountServiceImpl(AccountRepository accountRepository,
                          TransactionRepository transactionRepository) {

    this.accountRepository = accountRepository;
    this.transactionRepository = transactionRepository;
}

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