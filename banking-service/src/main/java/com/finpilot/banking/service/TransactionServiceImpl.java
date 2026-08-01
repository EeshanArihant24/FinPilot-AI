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
import com.finpilot.banking.dto.PredictionRequest;
import com.finpilot.banking.dto.PredictionResponse;

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

    @Autowired
    private AIService aiService;

    @Override
    @Transactional
    public TransactionResponse deposit(Long accountId, BigDecimal amount) {
    if (amount.compareTo(BigDecimal.ZERO) <= 0) {
    throw new RuntimeException("Invalid amount");
    }

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
    if (amount.compareTo(BigDecimal.ZERO) <= 0) {
    throw new RuntimeException("Invalid amount");
}

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
@Transactional(rollbackFor = Exception.class)
public TransactionResponse transfer(Long fromAccountId,
                                    Long toAccountId,
                                    BigDecimal amount) {

    System.out.println("STEP 1");

    Account sender = accountRepository.findById(fromAccountId)
            .orElseThrow(() -> new RuntimeException("Sender not found"));

    System.out.println("STEP 2");

    Account receiver = accountRepository.findById(toAccountId)
            .orElseThrow(() -> new RuntimeException("Receiver not found"));

    System.out.println("STEP 3");

    System.out.println(sender.getBalance());
    System.out.println(receiver.getBalance());

    sender.setBalance(sender.getBalance().subtract(amount));
    receiver.setBalance(receiver.getBalance().add(amount));

    System.out.println("STEP 4");

    accountRepository.save(sender);
    accountRepository.save(receiver);

    System.out.println("STEP 5");

    Transaction debit = new Transaction();
    debit.setAccount(sender);
    debit.setAmount(amount);
    debit.setDescription("Transfer");
    debit.setTransactionType(TransactionType.TRANSFER_OUT);
    debit.setStatus(TransactionStatus.SUCCESS);
    debit.setReferenceNumber(UUID.randomUUID().toString());

    transactionRepository.save(debit);

    System.out.println("STEP 6");

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