import { Routes, Route } from "react-router-dom";

import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import Dashboard from "./pages/Dashboard/Dashboard";

import Wallet from "./pages/Banking/Wallet";
import Deposit from "./pages/Banking/Deposit";
import Withdraw from "./pages/Banking/Withdraw";
import Transfer from "./pages/Banking/Transfer";
import Transactions from "./pages/Banking/Transactions";


export default function App() {
  return (
    <Routes>
  <Route path="/" element={<Login />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/dashboard" element={<Dashboard />} />

  <Route path="/wallet" element={<Wallet />} />
  <Route path="/deposit" element={<Deposit />} />
  <Route path="/withdraw" element={<Withdraw />} />
  <Route path="/transfer" element={<Transfer />} />
  <Route path="/transactions" element={<Transactions />} />
</Routes>
  );
}

