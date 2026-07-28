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

    if (amount.compareTo(BigDecimal.ZERO) <= 0) {
        throw new RuntimeException("Amount must be greater than zero");
    }

    if (fromAccountId.equals(toAccountId)) {
        throw new RuntimeException("Cannot transfer to same account");
    }

    Account sender = accountRepository.findById(fromAccountId)
            .orElseThrow(() -> new RuntimeException("Sender not found"));

    Account receiver = accountRepository.findById(toAccountId)
            .orElseThrow(() -> new RuntimeException("Receiver not found"));

    if (sender.getBalance().compareTo(amount) < 0) {
        throw new RuntimeException("Insufficient Balance");
    }

    PredictionRequest request = new PredictionRequest();

    request.setStep(1);
    request.setType("TRANSFER");
    request.setAmount(amount.doubleValue());

    request.setOldbalanceOrg(sender.getBalance().doubleValue());
    request.setNewbalanceOrig(sender.getBalance().subtract(amount).doubleValue());

    request.setOldbalanceDest(receiver.getBalance().doubleValue());
    request.setNewbalanceDest(receiver.getBalance().add(amount).doubleValue());

    request.setDevice_trusted(1);
    request.setLocation_match(1);
    request.setVelocity(1);
    request.setFailed_login_count(0);
    request.setIp_risk_score(0.20);
    request.setAccount_age_days(365);
    request.setHour(java.time.LocalTime.now().getHour());

    PredictionResponse prediction = aiService.predict(request);

    if (prediction != null && prediction.getPrediction() == 1) {
        throw new RuntimeException(
                "Transaction blocked by AI. Fraud Probability: "
                        + prediction.getFraud_probability());
    }

    sender.setBalance(sender.getBalance().subtract(amount));
    receiver.setBalance(receiver.getBalance().add(amount));

    accountRepository.saveAll(List.of(sender, receiver));

    String reference = UUID.randomUUID().toString();

    Transaction debit = new Transaction();
    debit.setAccount(sender);
    debit.setAmount(amount);
    debit.setDescription("Transfer to " + receiver.getAccountNumber());
    debit.setTransactionType(TransactionType.TRANSFER_OUT);
    debit.setStatus(TransactionStatus.SUCCESS);
    debit.setReferenceNumber(reference);

    Transaction credit = new Transaction();
    credit.setAccount(receiver);
    credit.setAmount(amount);
    credit.setDescription("Transfer from " + sender.getAccountNumber());
    credit.setTransactionType(TransactionType.TRANSFER_IN);
    credit.setStatus(TransactionStatus.SUCCESS);
    credit.setReferenceNumber(reference);

    transactionRepository.saveAll(List.of(debit, credit));

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