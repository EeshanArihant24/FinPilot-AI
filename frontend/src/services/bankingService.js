import api from "./api";

export const getWallet=()=>api.get("/wallet");

export const transferMoney=(data)=>api.post("/transfer",data);

export const getTransactions=()=>api.get("/transactions");