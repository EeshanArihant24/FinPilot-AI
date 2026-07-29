import api from "./api";
import { API } from "../api/endpoints";

const transactionService = {

  depositMoney(data) {
    return api.post(API.DEPOSIT, data);
  },

  withdrawMoney(data) {
    return api.post(API.WITHDRAW, data);
  },

  transferMoney(data) {
    return api.post(API.TRANSFER, data);
  },

  getTransactions(accountId) {
    return api.get(API.HISTORY(accountId));
  }

};

export default transactionService;