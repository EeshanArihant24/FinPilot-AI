package com.finpilot.banking.service;

import com.finpilot.banking.dto.DepositRequest;
import com.finpilot.banking.dto.TransferRequest;
import com.finpilot.banking.dto.TransactionResponse;
import com.finpilot.banking.dto.WithdrawRequest;
import com.finpilot.banking.entity.Account;
import com.finpilot.banking.entity.Transaction;
import com.finpilot.banking.entity.TransactionStatus;
import com.finpilot.banking.entity.TransactionType;
import com.finpilot.banking.repository.AccountRepository;
import com.finpilot.banking.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Override
@Transactional
public TransactionResponse deposit(Long accountId, BigDecimal amount) {

    Account account = accountRepository.findById(accountId)
            .orElseThrow(() -> new RuntimeException("Account not found"));

    account.setBalance(account.getBalance().add(amount));
    accountRepository.save(account);

    Transaction transaction = new Transaction();
    transaction.setAccount(account);
    transaction.setAmount(amount);
    transaction.setDescription("Deposit");
    transaction.setTransactionType(TransactionType.DEPOSIT);
    transaction.setStatus(TransactionStatus.SUCCESS);
    transaction.setReferenceNumber(UUID.randomUUID().toString());

    transactionRepository.save(transaction);

    return map(transaction);
}

    @Override
@Transactional
public TransactionResponse withdraw(Long accountId, BigDecimal amount) {

    Account account = accountRepository.findById(accountId)
            .orElseThrow(() -> new RuntimeException("Account not found"));

    if (account.getBalance().compareTo(amount) < 0) {
        throw new RuntimeException("Insufficient Balance");
    }

    account.setBalance(account.getBalance().subtract(amount));
    accountRepository.save(account);

    Transaction transaction = new Transaction();
    transaction.setAccount(account);
    transaction.setAmount(amount);
    transaction.setDescription("Withdrawal");
    transaction.setTransactionType(TransactionType.WITHDRAW);
    transaction.setStatus(TransactionStatus.SUCCESS);
    transaction.setReferenceNumber(UUID.randomUUID().toString());

    transactionRepository.save(transaction);

    return map(transaction);
}

    @Override
@Transactional
public TransactionResponse transfer(Long fromAccountId,
                                    Long toAccountId,
                                    BigDecimal amount) {

    Account sender = accountRepository.findById(fromAccountId)
            .orElseThrow(() -> new RuntimeException("Sender not found"));

    Account receiver = accountRepository.findById(toAccountId)
            .orElseThrow(() -> new RuntimeException("Receiver not found"));

    if (sender.getBalance().compareTo(amount) < 0) {
        throw new RuntimeException("Insufficient Balance");
    }

    sender.setBalance(sender.getBalance().subtract(amount));
    receiver.setBalance(receiver.getBalance().add(amount));

    accountRepository.save(sender);
    accountRepository.save(receiver);

    Transaction debit = new Transaction();
    debit.setAccount(sender);
    debit.setAmount(amount);
    debit.setDescription("Transfer to Account " + receiver.getAccountNumber());
    debit.setTransactionType(TransactionType.TRANSFER_OUT);
    debit.setStatus(TransactionStatus.SUCCESS);
    debit.setReferenceNumber(UUID.randomUUID().toString());

    transactionRepository.save(debit);

    Transaction credit = new Transaction();
    credit.setAccount(receiver);
    credit.setAmount(amount);
    credit.setDescription("Transfer from Account " + sender.getAccountNumber());
    credit.setTransactionType(TransactionType.TRANSFER_IN);
    credit.setStatus(TransactionStatus.SUCCESS);
    credit.setReferenceNumber(UUID.randomUUID().toString());

    transactionRepository.save(credit);

    return map(debit);
}

    @Override
    public List<TransactionResponse> getTransactionHistory(Long accountId) {

        return transactionRepository
                .findByAccountIdOrderByCreatedAtDesc(accountId)
                .stream()
                .map(this::map)
                .collect(Collectors.toList());

    }

    private TransactionResponse map(Transaction transaction) {

        TransactionResponse response = new TransactionResponse();

        response.setTransactionId(transaction.getId());
        response.setAmount(transaction.getAmount());
        response.setDescription(transaction.getDescription());
        response.setReferenceNumber(transaction.getReferenceNumber());
        response.setStatus(transaction.getStatus().name());
        response.setTransactionType(transaction.getTransactionType().name());
        response.setCreatedAt(transaction.getCreatedAt());

        return response;

    }

}