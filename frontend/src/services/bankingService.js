import api from "./api";

// Accounts
export const getAccounts = async () => {
  const response = await api.get("/accounts");
  return response.data;
};

export const getAccount = async (id) => {
  const response = await api.get(`/accounts/${id}`);
  return response.data;
};

export const createAccount = async (data) => {
  const response = await api.post("/accounts", data);
  return response.data;
};

export const updateAccount = async (id, data) => {
  const response = await api.put(`/accounts/${id}`, data);
  return response.data;
};

export const deleteAccount = async (id) => {
  const response = await api.delete(`/accounts/${id}`);
  return response.data;
};

// Transactions
export const depositMoney = async (data) => {
  const response = await api.post("/transactions/deposit", data);
  return response.data;
};

export const withdrawMoney = async (data) => {
  const response = await api.post("/transactions/withdraw", data);
  return response.data;
};

export const transferMoney = async (data) => {
  const response = await api.post("/transactions/transfer", data);
  return response.data;
};

export const getTransactions = async (accountId) => {
  const response = await api.get(`/transactions/account/${accountId}`);
  return response.data;
};