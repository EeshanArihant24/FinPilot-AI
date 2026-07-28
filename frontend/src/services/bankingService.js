import accountService from "./accountService";
import transactionService from "./transactionService";

const bankingService = {

  getAccount(id) {
    return accountService.getAccount(id);
  },

  getBalance(id) {
    return accountService.getBalance(id);
  },

  depositMoney(data) {
    return transactionService.depositMoney(data);
  },

  withdrawMoney(data) {
    return transactionService.withdrawMoney(data);
  },

  transferMoney(data) {
    return transactionService.transferMoney(data);
  },

  getTransactions(accountId) {
    return transactionService.getTransactions(accountId);
  }

};

export const getAccount = bankingService.getAccount;
export const getBalance = bankingService.getBalance;
export const depositMoney = bankingService.depositMoney;
export const withdrawMoney = bankingService.withdrawMoney;
export const transferMoney = bankingService.transferMoney;
export const getTransactions = bankingService.getTransactions;

export default bankingService;