package com.finpilot.banking.repository;

import com.finpilot.banking.entity.MutualFund;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MutualFundRepository extends JpaRepository<MutualFund, Long> {

    Optional<MutualFund> findByFundName(String fundName);

    List<MutualFund> findByRiskLevel(String riskLevel);

    List<MutualFund> findByFundType(String fundType);

}