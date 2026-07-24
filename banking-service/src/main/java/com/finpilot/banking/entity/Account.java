package com.finpilot.banking.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "accounts")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String accountNumber;

    private Double balance;

    private String accountType;

    private Long userId;

    private LocalDateTime createdAt;

    // Default constructor (Required by JPA)
    public Account() {
    }

    // Parameterized constructor
    public Account(String accountNumber, Double balance, String accountType,
                   Long userId, LocalDateTime createdAt) {
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.accountType = accountType;
        this.userId = userId;
        this.createdAt = createdAt;
    }

    // Getters

    public Long getId() {
        return id;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public Double getBalance() {
        return balance;
    }

    public String getAccountType() {
        return accountType;
    }

    public Long getUserId() {
        return userId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    // Setters

    public void setId(Long id) {
        this.id = id;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}