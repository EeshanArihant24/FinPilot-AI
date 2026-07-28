export const API = {

  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  ME: "/auth/me",

  CREATE_ACCOUNT: "/accounts",

  ACCOUNT: (id) => `/accounts/${id}`,

  BALANCE: (id) => `/accounts/${id}/balance`,

  DEPOSIT: "/api/transactions/deposit",

  WITHDRAW: "/api/transactions/withdraw",

  TRANSFER: "/api/transactions/transfer",

  HISTORY: (id) => `/api/transactions/account/${id}`,

  AI_PREDICT: "/predict"

};