package com.finpilot.banking.service;

import com.finpilot.banking.entity.*;
import com.finpilot.banking.dto.*;
import java.math.BigDecimal;

public interface AccountService {

    Account createAccount(Account account);

    Account getAccount(Long id);

    BigDecimal getBalance(Long id);

    DashboardResponse getDashboard(User user);
}