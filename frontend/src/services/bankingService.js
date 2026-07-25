import api from "./api";

const BANK = "/banking";

// Account

export const getAccount = async () => {
  const response = await api.get(`${BANK}/account`);
  return response.data;
};

// Deposit

export const depositMoney = async (data) => {
  const response = await api.post(
    `${BANK}/deposit`,
    data
  );

  return response.data;
};

// Withdraw

export const withdrawMoney = async (data) => {
  const response = await api.post(
    `${BANK}/withdraw`,
    data
  );

  return response.data;
};

// Transfer

export const transferMoney = async (data) => {
  const response = await api.post(
    `${BANK}/transfer`,
    data
  );

  return response.data;
};

// Transactions

export const getTransactions = async () => {
  const response = await api.get(
    `${BANK}/transactions`
  );

  return response.data;
};

// Balance

export const getBalance = async () => {
  const response = await api.get(
    `${BANK}/balance`
  );

  return response.data;
};