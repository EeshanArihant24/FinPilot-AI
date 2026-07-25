package com.finpilot.banking.controller;

import com.finpilot.banking.dto.DepositRequest;
import com.finpilot.banking.dto.TransactionResponse;
import com.finpilot.banking.dto.TransferRequest;
import com.finpilot.banking.dto.WithdrawRequest;
import com.finpilot.banking.service.TransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "*")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("/deposit")
    public ResponseEntity<TransactionResponse> deposit(
            @RequestBody DepositRequest request) {

        TransactionResponse response = transactionService.deposit(
                request.getAccountId(),
                request.getAmount()
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/withdraw")
    public ResponseEntity<TransactionResponse> withdraw(
            @RequestBody WithdrawRequest request) {

        TransactionResponse response = transactionService.withdraw(
                request.getAccountId(),
                request.getAmount()
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/transfer")
    public ResponseEntity<TransactionResponse> transfer(
            @RequestBody TransferRequest request) {

        TransactionResponse response = transactionService.transfer(
                request.getFromAccountId(),
                request.getToAccountId(),
                request.getAmount()
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/account/{accountId}")
    public ResponseEntity<List<TransactionResponse>> history(
            @PathVariable Long accountId) {

        return ResponseEntity.ok(
                transactionService.getTransactionHistory(accountId)
        );
    }
}